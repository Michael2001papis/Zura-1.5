// Quick Quote - טופס רב-שלבי חכם
// Multi-step smart form for quick quotes

class QuickQuoteManager {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.formData = {};
        this.uploadedFiles = [];
        this.init();
    }

    init() {
        this.setupForm();
        this.setupEventListeners();
        this.setupFileUpload();
        console.log('Quick Quote Manager initialized');
    }

    setupForm() {
        this.form = document.getElementById('quick-quote-form');
        if (!this.form) return;

        // Setup radio button listeners for step validation
        this.setupStepValidation();
    }

    setupEventListeners() {
        // Next buttons
        document.querySelectorAll('.btn-next').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextStep();
            });
        });

        // Previous buttons
        document.querySelectorAll('.btn-prev').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevStep();
            });
        });

        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitForm();
            });
        }

        // Radio button changes - enable/disable next button
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.validateCurrentStep();
            });
        });

        // Custom size toggle
        const sizeRadios = document.querySelectorAll('input[name="size"]');
        const customSizeGroup = document.getElementById('custom-size-group');
        sizeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'custom') {
                    customSizeGroup.style.display = 'block';
                    document.getElementById('custom-size').required = true;
                } else {
                    customSizeGroup.style.display = 'none';
                    document.getElementById('custom-size').required = false;
                }
                this.validateCurrentStep();
            });
        });

        // Text inputs validation
        document.querySelectorAll('input[type="text"], input[type="tel"], textarea').forEach(input => {
            input.addEventListener('input', () => {
                this.validateCurrentStep();
            });
        });
    }

    setupStepValidation() {
        // Validate step 1
        const step1Radios = document.querySelectorAll('input[name="workType"]');
        step1Radios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.validateStep1();
            });
        });

        // Validate step 2
        const cityInput = document.getElementById('location-city');
        const timingRadios = document.querySelectorAll('input[name="timing"]');
        
        if (cityInput) {
            cityInput.addEventListener('input', () => {
                this.validateStep2();
            });
        }
        
        timingRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.validateStep2();
            });
        });

        // Validate step 3
        const sizeRadios = document.querySelectorAll('input[name="size"]');
        const customSizeInput = document.getElementById('custom-size');
        
        sizeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.validateStep3();
            });
        });
        
        if (customSizeInput) {
            customSizeInput.addEventListener('input', () => {
                this.validateStep3();
            });
        }

        // Validate step 4
        const budgetRadios = document.querySelectorAll('input[name="budget"]');
        budgetRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.validateStep4();
            });
        });

        // Validate step 5
        const nameInput = document.getElementById('customer-name-quick');
        const phoneInput = document.getElementById('customer-phone-quick');
        
        if (nameInput) {
            nameInput.addEventListener('input', () => {
                this.validateStep5();
            });
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                Utils.formatPhoneNumber(e.target);
                this.validateStep5();
            });
        }
    }

    validateStep1() {
        const selected = document.querySelector('input[name="workType"]:checked');
        const nextBtn = document.querySelector('.form-step[data-step="1"] .btn-next');
        if (nextBtn) {
            nextBtn.disabled = !selected;
        }
    }

    validateStep2() {
        const city = document.getElementById('location-city')?.value.trim();
        const timing = document.querySelector('input[name="timing"]:checked');
        const nextBtn = document.querySelector('.form-step[data-step="2"] .btn-next');
        if (nextBtn) {
            nextBtn.disabled = !(city && timing);
        }
    }

    validateStep3() {
        const size = document.querySelector('input[name="size"]:checked');
        const customSize = document.getElementById('custom-size')?.value.trim();
        const nextBtn = document.querySelector('.form-step[data-step="3"] .btn-next');
        
        if (size?.value === 'custom') {
            if (nextBtn) {
                nextBtn.disabled = !customSize || customSize <= 0;
            }
        } else {
            if (nextBtn) {
                nextBtn.disabled = !size;
            }
        }
    }

    validateStep4() {
        const budget = document.querySelector('input[name="budget"]:checked');
        const nextBtn = document.querySelector('.form-step[data-step="4"] .btn-next');
        if (nextBtn) {
            nextBtn.disabled = !budget;
        }
    }

    validateStep5() {
        const name = document.getElementById('customer-name-quick')?.value.trim();
        const phone = document.getElementById('customer-phone-quick')?.value.trim();
        const submitBtn = document.querySelector('.btn-submit');
        
        if (submitBtn) {
            const isValid = name && phone && Utils.validatePhone(phone);
            submitBtn.disabled = !isValid;
        }
    }

    validateCurrentStep() {
        switch(this.currentStep) {
            case 1: this.validateStep1(); break;
            case 2: this.validateStep2(); break;
            case 3: this.validateStep3(); break;
            case 4: this.validateStep4(); break;
            case 5: this.validateStep5(); break;
        }
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            // Save current step data
            this.saveStepData(this.currentStep);
            
            // Hide current step
            const currentStepEl = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
            if (currentStepEl) {
                currentStepEl.classList.remove('active');
            }
            
            // Show next step
            this.currentStep++;
            const nextStepEl = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
            if (nextStepEl) {
                nextStepEl.classList.add('active');
            }
            
            // Update progress
            this.updateProgress();
            
            // Validate new step
            this.validateCurrentStep();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            // Hide current step
            const currentStepEl = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
            if (currentStepEl) {
                currentStepEl.classList.remove('active');
            }
            
            // Show previous step
            this.currentStep--;
            const prevStepEl = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
            if (prevStepEl) {
                prevStepEl.classList.add('active');
            }
            
            // Update progress
            this.updateProgress();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    saveStepData(step) {
        const stepEl = document.querySelector(`.form-step[data-step="${step}"]`);
        if (!stepEl) return;

        // Get all form data from this step
        const formData = new FormData(stepEl.closest('form'));
        
        // Save to this.formData
        for (let [key, value] of formData.entries()) {
            this.formData[key] = value;
        }
    }

    updateProgress() {
        const progress = (this.currentStep / this.totalSteps) * 100;
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }

        // Update step indicators
        document.querySelectorAll('.progress-steps .step').forEach((step, index) => {
            const stepNum = index + 1;
            if (stepNum <= this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    setupFileUpload() {
        const fileInput = document.getElementById('photo-upload');
        const preview = document.getElementById('upload-preview');
        
        if (!fileInput || !preview) return;

        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.uploadedFiles = files;
            this.displayFilePreview(files, preview);
        });
    }

    displayFilePreview(files, previewContainer) {
        previewContainer.innerHTML = '';
        
        if (files.length === 0) return;

        files.forEach((file, index) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="Preview ${index + 1}">
                        <button type="button" class="remove-file" data-index="${index}">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    previewContainer.appendChild(previewItem);
                    
                    // Remove file button
                    previewItem.querySelector('.remove-file').addEventListener('click', () => {
                        this.removeFile(index);
                    });
                };
                reader.readAsDataURL(file);
            } else if (file.type.startsWith('video/')) {
                previewItem.innerHTML = `
                    <div class="video-preview">
                        <i class="fas fa-video"></i>
                        <span>${file.name}</span>
                        <button type="button" class="remove-file" data-index="${index}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
                previewContainer.appendChild(previewItem);
                
                previewItem.querySelector('.remove-file').addEventListener('click', () => {
                    this.removeFile(index);
                });
            }
        });
    }

    removeFile(index) {
        this.uploadedFiles.splice(index, 1);
        const fileInput = document.getElementById('photo-upload');
        const dt = new DataTransfer();
        
        this.uploadedFiles.forEach(file => {
            dt.items.add(file);
        });
        
        fileInput.files = dt.files;
        this.displayFilePreview(this.uploadedFiles, document.getElementById('upload-preview'));
    }

    async submitForm() {
        // Save all form data
        const formData = new FormData(this.form);
        
        // Add uploaded files
        this.uploadedFiles.forEach((file, index) => {
            formData.append(`file_${index}`, file);
        });

        // Convert to object
        const data = {
            workType: formData.get('workType'),
            city: formData.get('city'),
            street: formData.get('street') || '',
            timing: formData.get('timing'),
            size: formData.get('size'),
            customSize: formData.get('customSize') || '',
            budget: formData.get('budget'),
            customerName: formData.get('customerName'),
            customerPhone: formData.get('customerPhone'),
            notes: formData.get('notes') || '',
            timestamp: new Date().toISOString(),
            status: 'new'
        };

        // Show loading
        const submitBtn = document.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';

        try {
            // Save lead
            await this.saveLead(data);
            
            // Generate WhatsApp message
            const whatsappMessage = this.generateWhatsAppMessage(data);
            
            // Show success screen
            this.showSuccessScreen(whatsappMessage);
            
            // Send confirmation (if backend available)
            await this.sendConfirmation(data);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            Utils.showToast('שגיאה בשליחת הבקשה. אנא נסה שוב או צור קשר ישירות.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }

    async saveLead(data) {
        // Use LeadsManager if available
        if (window.LeadsManager) {
            const lead = window.LeadsManager.addLead(data);
            console.log('Lead saved via LeadsManager:', lead);
        } else {
            // Fallback to localStorage
            const leads = JSON.parse(localStorage.getItem('zura_leads') || '[]');
            const lead = {
                id: Date.now(),
                ...data
            };
            leads.push(lead);
            localStorage.setItem('zura_leads', JSON.stringify(leads));
            console.log('Lead saved to localStorage:', lead);
        }
        
        // If backend API exists, send there too
        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: Date.now(),
                    ...data
                })
            });
            
            if (response.ok) {
                console.log('Lead saved to backend');
            }
        } catch (error) {
            // Backend not available - that's OK, we have localStorage
            console.log('Backend not available, using localStorage only');
        }
    }

    generateWhatsAppMessage(data) {
        const workTypeNames = {
            'renovation': 'שיפוץ כללי',
            'paint': 'צבע',
            'flooring': 'ריצוף',
            'plumbing': 'אינסטלציה',
            'gypsum': 'גבס',
            'insulation': 'איטום',
            'electrical': 'חשמל',
            'other': 'אחר'
        };

        const timingNames = {
            'urgent': 'דחוף',
            'this-week': 'השבוע',
            'this-month': 'החודש',
            'not-sure': 'עוד לא בטוח'
        };

        const sizeNames = {
            'room': 'חדר אחד',
            'bathroom': 'מקלחת',
            'apartment-3': 'דירה 3 חדרים',
            'apartment-4': 'דירה 4 חדרים',
            'house': 'בית פרטי',
            'custom': `אחר - ${data.customSize} מ"ר`
        };

        const budgetNames = {
            'up-to-3k': 'עד 3,000 ₪',
            '3k-8k': '3,000 - 8,000 ₪',
            '8k-20k': '8,000 - 20,000 ₪',
            '20k-plus': '20,000+ ₪',
            'not-sure': 'לא יודע'
        };

        let message = `שלום זורה,\n\n`;
        message += `בקשה חדשה להצעת מחיר:\n\n`;
        message += `סוג עבודה: ${workTypeNames[data.workType] || data.workType}\n`;
        message += `מיקום: ${data.city}${data.street ? ', ' + data.street : ''}\n`;
        message += `מתי: ${timingNames[data.timing] || data.timing}\n`;
        message += `גודל: ${sizeNames[data.size] || data.size}\n`;
        message += `תקציב: ${budgetNames[data.budget] || data.budget}\n\n`;
        message += `פרטים:\n`;
        message += `שם: ${data.customerName}\n`;
        message += `טלפון: ${data.customerPhone}\n`;
        
        if (data.notes) {
            message += `הערות: ${data.notes}\n`;
        }
        
        message += `\nתודה!`;

        return encodeURIComponent(message);
    }

    showSuccessScreen(whatsappMessage) {
        // Hide form
        if (this.form) {
            this.form.style.display = 'none';
        }

        // Show success screen
        const successScreen = document.getElementById('success-screen');
        if (successScreen) {
            successScreen.style.display = 'block';
            
            // Set WhatsApp link
            const whatsappLink = document.getElementById('whatsapp-link');
            if (whatsappLink) {
                // Use wa.me (works on mobile and WhatsApp Web)
                const phoneNumber = '972501234567'; // Change this to actual number
                whatsappLink.href = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
            }
        }

        // New request button
        const newRequestBtn = document.getElementById('new-request-btn');
        if (newRequestBtn) {
            newRequestBtn.addEventListener('click', () => {
                this.resetForm();
            });
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    resetForm() {
        // Reset form
        if (this.form) {
            this.form.reset();
            this.form.style.display = 'block';
        }

        // Hide success screen
        const successScreen = document.getElementById('success-screen');
        if (successScreen) {
            successScreen.style.display = 'none';
        }

        // Reset to step 1
        this.currentStep = 1;
        document.querySelectorAll('.form-step').forEach((step, index) => {
            if (index === 0) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Reset progress
        this.updateProgress();

        // Reset data
        this.formData = {};
        this.uploadedFiles = [];

        // Reset file preview
        const preview = document.getElementById('upload-preview');
        if (preview) {
            preview.innerHTML = '';
        }

        // Validate step 1
        this.validateStep1();
    }

    async sendConfirmation(data) {
        // Send confirmation email/SMS (if backend available)
        try {
            const response = await fetch('/api/leads/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: data.customerPhone,
                    name: data.customerName,
                    message: 'קיבלנו את הבקשה שלכם! נחזור אליכם תוך 2-4 שעות.'
                })
            });
            
            if (response.ok) {
                console.log('Confirmation sent');
            }
        } catch (error) {
            // Backend not available - that's OK
            console.log('Confirmation service not available');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.QuickQuoteManager = new QuickQuoteManager();
});
