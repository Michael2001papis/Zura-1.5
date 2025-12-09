// אובייקט Utils - פונקציות עזר משותפות
// Utils object - shared utility functions

const Utils = {
    /**
     * פורמט מספר טלפון ישראלי
     * Format Israeli phone number
     */
    formatPhoneNumber(input) {
        if (!input || !input.value) return;
        
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 0 && value.length <= 3) {
            value = value;
        } else if (value.length > 3 && value.length <= 6) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        } else if (value.length > 6 && value.length <= 10) {
            value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
        } else if (value.length > 10) {
            value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
        }
        
        input.value = value;
    },

    /**
     * אימות כתובת אימייל
     * Validate email address
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * אימות מספר טלפון ישראלי
     * Validate Israeli phone number
     */
    validatePhone(phone) {
        const phoneRegex = /^0(5[0-9]|7[0-9]|2[0-9]|3[0-9]|4[0-9]|8[0-9])-?\d{3}-?\d{4}$/;
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 9 && cleaned.length <= 10;
    },

    /**
     * הצגת הודעת טוסט
     * Show toast notification
     */
    showToast(message, type = 'success') {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Add to body
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Remove toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    },

    /**
     * פורמט מספר כמטבע (שקל)
     * Format number as currency (Shekel)
     */
    formatCurrency(amount) {
        if (typeof amount !== 'number') {
            amount = parseFloat(amount) || 0;
        }
        return new Intl.NumberFormat('he-IL', {
            style: 'currency',
            currency: 'ILS',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount).replace('ILS', '₪');
    },

    /**
     * Throttle function - מגביל קריאות לפונקציה
     * Throttle function - limits function calls
     */
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * גלילה חלקה לאלמנט
     * Smooth scroll to element
     */
    smoothScrollTo(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

// ייצוא גלובלי
// Global export
window.Utils = Utils;

