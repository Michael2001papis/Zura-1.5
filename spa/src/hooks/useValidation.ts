import { useState, useCallback, useMemo, useEffect } from 'react';
import { VALIDATION_RULES } from '../constants';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | null;
  message?: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface ValidationState {
  errors: ValidationErrors;
  isValid: boolean;
  touched: { [key: string]: boolean };
  validate: (field: string, value: unknown) => string | null;
  validateAll: (data: Record<string, unknown>) => ValidationErrors;
  setTouched: (field: string, touched?: boolean) => void;
  clearErrors: (field?: string) => void;
  reset: () => void;
}

export function useValidation(rules: Record<string, ValidationRule>): ValidationState {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validate = useCallback((field: string, value: unknown): string | null => {
    const rule = rules[field];
    if (!rule) return null;

    // Required validation
    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return rule.message || 'שדה זה נדרש';
    }

    // Skip other validations if value is empty and not required
    if (!value || (typeof value === 'string' && !value.trim())) {
      return null;
    }

    // Min length validation
    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      return rule.message || `מינימום ${rule.minLength} תווים נדרש`;
    }

    // Max length validation
    if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
      return rule.message || `מקסימום ${rule.maxLength} תווים מותר`;
    }

    // Pattern validation
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return rule.message || 'פורמט לא תקין';
    }

    // Custom validation
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [rules]);

  const validateAll = useCallback((data: Record<string, unknown>): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    
    Object.keys(rules).forEach(field => {
      const error = validate(field, data[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return newErrors;
  }, [rules, validate]);

  const setTouchedField = useCallback((field: string, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  const clearErrors = useCallback((field?: string) => {
    if (field) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } else {
      setErrors({});
    }
  }, []);

  const reset = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  return {
    errors,
    isValid,
    touched,
    validate,
    validateAll,
    setTouched: setTouchedField,
    clearErrors,
    reset
  };
}

// Predefined validation rules
export const validationRules = {
  email: {
    required: true,
    pattern: VALIDATION_RULES.EMAIL,
    message: 'כתובת אימייל לא תקינה'
  },
  phone: {
    required: true,
    pattern: VALIDATION_RULES.PHONE,
    message: 'מספר טלפון לא תקין'
  },
  name: {
    required: true,
    pattern: VALIDATION_RULES.NAME,
    minLength: 2,
    maxLength: 50,
    message: 'שם לא תקין (2-50 תווים בעברית)'
  },
  address: {
    required: true,
    pattern: VALIDATION_RULES.ADDRESS,
    minLength: 5,
    maxLength: 100,
    message: 'כתובת לא תקינה (5-100 תווים)'
  },
  price: {
    required: true,
    pattern: VALIDATION_RULES.PRICE,
    message: 'מחיר לא תקין'
  },
  quantity: {
    required: true,
    pattern: VALIDATION_RULES.QUANTITY,
    message: 'כמות לא תקינה'
  },
  required: {
    required: true,
    message: 'שדה זה נדרש'
  },
  optional: {
    required: false
  }
};

// Form validation hook
export function useFormValidation<T extends Record<string, unknown>>(
  initialData: T,
  rules: Record<keyof T, ValidationRule>
) {
  const validation = useValidation(rules);
  const [data, setData] = useState<T>(initialData);

  const updateField = useCallback((field: keyof T, value: unknown) => {
    setData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (validation.errors[field as string]) {
      validation.clearErrors(field as string);
    }
  }, [validation]);

  const handleBlur = useCallback((field: keyof T) => {
    validation.setTouched(field as string);
    const error = validation.validate(field as string, data[field]);
    if (error) {
      // setErrors(prev => ({ ...prev, [field]: error }));
    }
  }, [validation, data]);

  const handleSubmit = useCallback((onSubmit: (data: T) => void) => {
    const errors = validation.validateAll(data);
    if (Object.keys(errors).length === 0) {
      onSubmit(data);
    }
  }, [validation, data]);

  const reset = useCallback(() => {
    setData(initialData);
    validation.reset();
  }, [initialData, validation]);

  return {
    data,
    errors: validation.errors,
    isValid: validation.isValid,
    touched: validation.touched,
    updateField,
    handleBlur,
    handleSubmit,
    reset,
    setData
  };
}

// Real-time validation hook
export function useRealTimeValidation<T extends Record<string, unknown>>(
  data: T,
  rules: Record<keyof T, ValidationRule>,
  debounceMs: number = 300
) {
  const validation = useValidation(rules);
  const [debouncedData, setDebouncedData] = useState<T>(data);

  // Debounce data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedData(data);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [data, debounceMs]);

  // Validate when debounced data changes
  useEffect(() => {
    validation.validateAll(debouncedData);
  }, [debouncedData, validation]);

  return validation;
}

// Field validation hook
export function useFieldValidation(
  value: unknown,
  rules: ValidationRule,
  debounceMs: number = 300
) {
  const [error, setError] = useState<string | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Debounce value changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs]);

  // Validate when debounced value changes
  useEffect(() => {
    if (isTouched) {
      const newError = validateField(debouncedValue, rules);
      setError(newError);
    }
  }, [debouncedValue, isTouched, rules]);

  const handleBlur = useCallback(() => {
    setIsTouched(true);
    const newError = validateField(debouncedValue, rules);
    setError(newError);
  }, [debouncedValue, rules]);

  const handleFocus = useCallback(() => {
    if (error) {
      setError(null);
    }
  }, [error]);

  return {
    error,
    isTouched,
    handleBlur,
    handleFocus,
    setTouched: setIsTouched
  };
}

// Helper function to validate a single field
function validateField(value: unknown, rules: ValidationRule): string | null {
  // Required validation
  if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return rules.message || 'שדה זה נדרש';
  }

  // Skip other validations if value is empty and not required
  if (!value || (typeof value === 'string' && !value.trim())) {
    return null;
  }

  // Min length validation
  if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
    return rules.message || `מינימום ${rules.minLength} תווים נדרש`;
  }

  // Max length validation
  if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
    return rules.message || `מקסימום ${rules.maxLength} תווים מותר`;
  }

  // Pattern validation
  if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
    return rules.message || 'פורמט לא תקין';
  }

  // Custom validation
  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
}