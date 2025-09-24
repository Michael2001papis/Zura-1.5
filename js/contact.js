// Contact form functionality

// Contact manager class
class ContactManager {
    constructor() {
        this.form = null;
        this.formInitialized = false;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeForm());
        } else {
            this.initializeForm();
        }
    }

    initializeForm() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        this.setupFormValidation();
        this.setupFormSubmission();
        this.setupFormEnhancements();
        this.formInitialized = true;
        
        console.log('Contact form initialized successfully');
    }

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
    }

    setupFormEnhancements() {
        // Phone number formatting
        const phoneInput = this.form.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                this.formatPhoneNumber(e.target);
            });
        }

        // Auto-resize textarea
        const messageTextarea = this.form.querySelector('#message');
        if (messageTextarea) {
            messageTextarea.addEventListener('input', (e) => {
                this.autoResizeTextarea(e.target);
            });
        }

        // Form field focus effects
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            if (input) {
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        group.classList.remove('focused');
                    }
                });
            }
        });
    }

    handleFormSubmission() {
        if (!this.validateForm()) {
            this.showFormError('אנא תקן את השגיאות בטופס');
            return;
        }

        const formData = this.getFormData();
        this.submitForm(formData);
    }

    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'שדה זה נדרש';
        }

        // Email validation
        if (fieldName === 'email' && value) {
            if (!this.isValidEmail(value)) {
                isValid = false;
                errorMessage = 'כתובת אימייל לא תקינה';
            }
        }

        // Phone validation
        if (fieldName === 'phone' && value) {
            if (!this.isValidPhone(value)) {
                isValid = false;
                errorMessage = 'מספר טלפון לא תקין';
            }
        }

        // Name validation
        if (fieldName === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'השם חייב להכיל לפחות 2 תווים';
            }
        }

        // Message validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'ההודעה חייבת להכיל לפחות 10 תווים';
            }
        }

        this.showFieldError(field, isValid, errorMessage);
        return isValid;
    }

    showFieldError(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.field-error');
        
        if (existingError) {
            existingError.remove();
        }

        if (!isValid) {
            field.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = errorMessage;
            formGroup.appendChild(errorElement);
        } else {
            field.classList.remove('error');
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    showFormError(message) {
        if (window.ContractorApp && window.ContractorApp.showToast) {
            window.ContractorApp.showToast(message, 'error');
        } else {
            alert(message);
        }
    }

    showFormSuccess(message) {
        if (window.ContractorApp && window.ContractorApp.showToast) {
            window.ContractorApp.showToast(message, 'success');
        } else {
            alert(message);
        }
    }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        
        return data;
    }

    async submitForm(formData) {
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'שולח...';
        submitButton.classList.add('loading');

        try {
            // Simulate form submission (replace with actual API call)
            await this.simulateFormSubmission(formData);
            
            // Success
            this.showFormSuccess('ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.');
            this.resetForm();
            
        } catch (error) {
            // Error
            this.showFormError('שגיאה בשליחת ההודעה. אנא נסה שוב.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.classList.remove('loading');
        }
    }

    async simulateFormSubmission(formData) {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% success rate)
                if (Math.random() > 0.1) {
                    resolve(formData);
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 2000);
        });
    }

    resetForm() {
        this.form.reset();
        
        // Clear all field errors
        const errorFields = this.form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
        const errorMessages = this.form.querySelectorAll('.field-error');
        errorMessages.forEach(error => error.remove());
        
        // Remove focus states
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('focused'));
    }

    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length <= 9) {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 9);
            }
        }
        
        input.value = value;
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\d\-\s\(\)]+$/;
        const digitsOnly = phone.replace(/\D/g, '');
        return phoneRegex.test(phone) && digitsOnly.length >= 10;
    }

    // Public method to validate specific field
    validateFieldByName(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            return this.validateField(field);
        }
        return false;
    }

    // Public method to get field value
    getFieldValue(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        return field ? field.value.trim() : '';
    }

    // Public method to set field value
    setFieldValue(fieldName, value) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.value = value;
            this.validateField(field);
        }
    }

}

// Initialize contact manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.ContactManager = new ContactManager();
});

// Add CSS for form enhancements
const formCSS = `
<style>
.form-group.focused label {
    color: var(--primary-color);
    transform: translateY(-2px);
}

.form-group input.error,
.form-group textarea.error,
.form-group select.error {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(231, 111, 81, 0.1);
}

.field-error {
    color: var(--accent-color);
    font-size: 0.8rem;
    margin-top: 0.25rem;
    display: block;
}

.btn.loading {
    position: relative;
    color: transparent;
}

.btn.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Toast notifications */
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: white;
    color: #333;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 3000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
}

.toast.show {
    transform: translateX(0);
}

.toast-success {
    border-right: 4px solid #28a745;
}

.toast-error {
    border-right: 4px solid var(--accent-color);
}

.toast::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: 8px 8px 0 0;
}

.toast-success::before {
    background-color: #28a745;
}

.toast-error::before {
    background-color: var(--accent-color);
}

@media (max-width: 768px) {
    .toast {
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
</style>
`;

// Add form CSS to head
document.head.insertAdjacentHTML('beforeend', formCSS);

// Export for global access
window.ContactManager = ContactManager;
