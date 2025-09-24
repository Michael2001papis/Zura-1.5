// Base types
export interface BaseEntity {
  id: number | string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Quote related types
export interface QuoteRow extends BaseEntity {
  location: string;
  workType: string;
  quantity: number;
  percent: number;
  price: number;
  withoutVAT: number;
  vat: number;
  withVAT: number;
}

export interface QuoteTotals {
  withoutVAT: number;
  vat: number;
  withVAT: number;
}

export interface QuoteData {
  rows: QuoteRow[];
  totals: QuoteTotals;
  clientInfo?: ClientInfo;
  createdAt: Date;
  updatedAt: Date;
}

// Contact related types
export interface ClientInfo {
  name: string;
  phone: string;
  email: string;
  address?: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

// Project related types
export interface Project {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  tags: string[];
  completedAt: Date;
  category: ProjectCategory;
}

export type ProjectCategory = 'bedroom' | 'kitchen' | 'living-room' | 'bathroom' | 'office' | 'other';

// Invoice related types
export interface InvoiceData {
  invoiceNumber: string;
  recipient: string;
  date: string;
  address: string;
  details: string;
  totalBeforeVAT: number;
  vatAmount: number;
  totalWithVAT: number;
  paymentMethod: string;
}

// Business info
export interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: WorkingHours;
}

export interface WorkingHours {
  sundayToThursday: string;
  friday: string;
  saturday: string;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isValid: boolean;
  isSubmitting: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation types
export interface NavigationItem {
  path: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}

// Statistics types
export interface BusinessStats {
  completedProjects: number;
  satisfiedClients: number;
  yearsExperience: number;
  averageRating: number;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  projectType?: string;
  date: Date;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Event types
export interface CustomEvent<T = unknown> {
  type: string;
  payload: T;
  timestamp: Date;
}

// Storage types
export interface StorageItem<T> {
  data: T;
  expiresAt?: Date;
  version: string;
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'tel' | 'number' | 'password';
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export interface SelectProps extends BaseComponentProps {
  options: Array<{ value: string | number; label: string }>;
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}
