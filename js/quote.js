// Quote calculator functionality

// Quote manager class
class QuoteManager {
    constructor() {
        this.form = null;
        this.quoteInitialized = false;
        this.additionalQuotes = [];
        this.quoteCounter = 0;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeQuote());
        } else {
            this.initializeQuote();
        }
    }

    initializeQuote() {
        this.form = document.getElementById('quote-form');
        if (!this.form) return;

        this.setupFormValidation();
        this.setupFormSubmission();
        this.setupFormEnhancements();
        this.setupCustomFields();
        this.setupAdditionalQuotes();
        this.setupPrintFunctionality();
        this.quoteInitialized = true;
        
        console.log('Quote calculator initialized successfully');
    }

    // Setup custom fields visibility
    setupCustomFields() {
        // Project type custom field
        const projectTypeSelect = document.getElementById('project-type');
        const customProjectGroup = document.getElementById('custom-project-group');
        
        if (projectTypeSelect && customProjectGroup) {
            projectTypeSelect.addEventListener('change', (e) => {
                if (e.target.value === 'other') {
                    customProjectGroup.style.display = 'block';
                } else {
                    customProjectGroup.style.display = 'none';
                }
            });
        }

        // Work type custom field
        const workTypeSelect = document.getElementById('work-type');
        const customWorkGroup = document.getElementById('custom-work-group');
        
        if (workTypeSelect && customWorkGroup) {
            workTypeSelect.addEventListener('change', (e) => {
                if (e.target.value === 'other-work') {
                    customWorkGroup.style.display = 'block';
                } else {
                    customWorkGroup.style.display = 'none';
                }
            });
        }

        // Quantity unit custom field
        const quantityUnitSelect = document.getElementById('quantity-unit');
        const customUnitGroup = document.getElementById('custom-unit-group');
        
        if (quantityUnitSelect && customUnitGroup) {
            quantityUnitSelect.addEventListener('change', (e) => {
                if (e.target.value === 'other-unit') {
                    customUnitGroup.style.display = 'block';
                } else {
                    customUnitGroup.style.display = 'none';
                }
            });
        }
    }

    // Setup additional quotes functionality
    setupAdditionalQuotes() {
        const addQuoteBtn = document.getElementById('add-quote-btn');
        if (addQuoteBtn) {
            addQuoteBtn.addEventListener('click', () => {
                this.addAdditionalQuote();
            });
        }
    }

    // Setup print functionality
    setupPrintFunctionality() {
        const printBtn = document.getElementById('print-quote-result-btn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                this.printQuote();
            });
        }

        const saveBtn = document.getElementById('save-quote-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveQuote();
            });
        }

        const newQuoteBtn = document.getElementById('new-quote-btn');
        if (newQuoteBtn) {
            newQuoteBtn.addEventListener('click', () => {
                this.createNewQuote();
            });
        }
    }

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateQuote();
        });
    }

    setupFormEnhancements() {
        // Phone number formatting
        const phoneInput = this.form.querySelector('#customer-phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                this.formatPhoneNumber(e.target);
            });
        }

        // Auto-resize textarea
        const noteTextarea = this.form.querySelector('#customer-note');
        if (noteTextarea) {
            noteTextarea.addEventListener('input', (e) => {
                this.autoResizeTextarea(e.target);
            });
        }

        // Real-time calculation on form changes
        const calculationInputs = this.form.querySelectorAll('select, input[type="number"]');
        calculationInputs.forEach(input => {
            input.addEventListener('change', () => {
                if (this.isFormValidForCalculation()) {
                    this.calculateQuote(true);
                }
            });
        });
    }

    calculateQuote(showResult = false) {
        if (!this.validateForm()) {
            this.showFormError('אנא תקן את השגיאות בטופס');
            return;
        }

        const formData = this.getFormData();
        const quote = this.performCalculation(formData);
        
        this.displayQuote(quote);
        
        if (showResult) {
            this.showQuoteResult();
        }
    }

    performCalculation(data) {
        const quotes = this.getAllQuotes(data);
        const vatRate = parseFloat(data.vatRate) / 100;
        
        let subtotal = 0;
        let totalVat = 0;
        let totalWithVat = 0;
        
        // Calculate each quote
        quotes.forEach(quote => {
            const workPrice = parseFloat(quote.workPrice);
            const workQuantity = parseFloat(quote.workQuantity);
            const workPercentage = parseFloat(quote.workPercentage) / 100;
            const discount = parseFloat(quote.specialDiscount) / 100;
            
            // Calculate base amount
            let amount = workPrice * workQuantity * workPercentage;
            
            // Apply discount
            if (discount > 0) {
                amount = amount * (1 - discount);
            }
            
            quote.amount = amount;
            quote.vat = amount * vatRate;
            quote.total = amount + quote.vat;
            
            subtotal += amount;
            totalVat += quote.vat;
            totalWithVat += quote.total;
        });
        
        return {
            quotes: quotes,
            subtotal: subtotal,
            vatAmount: totalVat,
            vatRate: vatRate,
            totalWithVat: totalWithVat,
            formData: data
        };
    }

    getAllQuotes(data) {
        const quotes = [];
        
        // Main quote
        quotes.push({
            projectType: this.getProjectTypeName(data.projectType, data.customProject),
            workPercentage: data.workPercentage,
            workType: this.getWorkTypeName(data.workType, data.customWork),
            workPrice: data.workPrice,
            workQuantity: data.workQuantity,
            quantityUnit: this.getQuantityUnitName(data.quantityUnit, data.customUnit),
            specialDiscount: data.specialDiscount || 0
        });
        
        // Additional quotes
        this.additionalQuotes.forEach((quote, index) => {
            const quoteId = quote.id;
            const quoteElement = document.getElementById(quoteId);
            if (quoteElement) {
                const inputs = quoteElement.querySelectorAll('input, select');
                const quoteData = {};
                inputs.forEach(input => {
                    const name = input.name;
                    if (name) {
                        quoteData[name] = input.value;
                    }
                });
                
                quotes.push({
                    projectType: this.getProjectTypeName(
                        quoteData[`additionalProjectType_${index + 1}`], 
                        quoteData[`additionalCustomProject_${index + 1}`]
                    ),
                    workPercentage: quoteData[`additionalWorkPercentage_${index + 1}`],
                    workType: this.getWorkTypeName(
                        quoteData[`additionalWorkType_${index + 1}`], 
                        quoteData[`additionalCustomWork_${index + 1}`]
                    ),
                    workPrice: quoteData[`additionalWorkPrice_${index + 1}`],
                    workQuantity: quoteData[`additionalWorkQuantity_${index + 1}`],
                    quantityUnit: this.getQuantityUnitName(
                        quoteData[`additionalQuantityUnit_${index + 1}`], 
                        quoteData[`additionalCustomUnit_${index + 1}`]
                    ),
                    specialDiscount: quoteData[`additionalSpecialDiscount_${index + 1}`] || 0
                });
            }
        });
        
        return quotes;
    }

    getProjectTypeName(type, custom) {
        const types = {
            'villa': 'וילה',
            'house': 'בית',
            'yard': 'חצר',
            'roof': 'גג',
            'other': custom || 'אחר'
        };
        return types[type] || 'לא צוין';
    }

    getWorkTypeName(type, custom) {
        const types = {
            'gypsum': 'גבס',
            'plaster': 'שפכטל',
            'paint': 'צבע',
            'insulation': 'איטום',
            'reinforcement': 'חיזוק',
            'demolition': 'הריסה',
            'electrical': 'חשמל',
            'plumbing': 'ניאגרה',
            'other-work': custom || 'אחר'
        };
        return types[type] || 'לא צוין';
    }

    getQuantityUnitName(unit, custom) {
        const units = {
            'sqm': 'מ"ר',
            'sqcm': 'מ"א',
            'linear': 'י"ח',
            'meter': 'מטר',
            'other-unit': custom || 'אחר'
        };
        return units[unit] || 'לא צוין';
    }

    displayQuote(quote) {
        // Update quote header
        document.getElementById('quote-date').textContent = new Date().toLocaleDateString('he-IL');
        document.getElementById('quote-customer').textContent = quote.formData.customerName || 'לא צוין';
        document.getElementById('quote-address').textContent = quote.formData.customerAddress || 'לא צוין';
        document.getElementById('quote-phone').textContent = quote.formData.customerPhone || 'לא צוין';
        document.getElementById('quote-note').textContent = quote.formData.customerNote || 'אין הערות';
        
        // Update project details
        document.getElementById('quote-project-type').textContent = quote.quotes[0].projectType;
        document.getElementById('quote-work-percentage').textContent = quote.quotes[0].workPercentage + '%';
        document.getElementById('quote-work-type').textContent = quote.quotes[0].workType;
        
        // Update quote items table
        this.displayQuoteTable(quote.quotes);
        
        // Update totals
        document.getElementById('subtotal').textContent = this.formatCurrency(quote.subtotal);
        document.getElementById('vat-percentage').textContent = (quote.vatRate * 100).toFixed(0);
        document.getElementById('vat-amount').textContent = this.formatCurrency(quote.vatAmount);
        document.getElementById('vat-amount-footer').textContent = this.formatCurrency(quote.vatAmount);
        document.getElementById('total-price').textContent = this.formatCurrency(quote.totalWithVat);
        document.getElementById('total-price-footer').textContent = this.formatCurrency(quote.totalWithVat);
        
        // Store quote data for sending
        this.currentQuote = quote;
    }

    displayQuoteTable(quotes) {
        const tableBody = document.getElementById('quote-table-body');
        tableBody.innerHTML = '';
        
        quotes.forEach((quote, index) => {
            const row = document.createElement('tr');
            row.className = 'quote-row';
            
            const discountText = quote.specialDiscount > 0 ? `${quote.specialDiscount}%` : 'ללא';
            
            row.innerHTML = `
                <td class="row-number">${index + 1}</td>
                <td class="work-description">${quote.workType} - ${quote.projectType}</td>
                <td class="unit-price">${this.formatCurrency(quote.workPrice)}</td>
                <td class="amount">${quote.workQuantity} ${quote.quantityUnit}</td>
                <td class="work-percentage">${quote.workPercentage}%</td>
                <td class="discount">${discountText}</td>
                <td class="amount">${this.formatCurrency(quote.amount)}</td>
                <td class="vat">${this.formatCurrency(quote.vat)}</td>
                <td class="total">${this.formatCurrency(quote.total)}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }

    showQuoteResult() {
        const resultDiv = document.getElementById('quote-result');
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
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

    isFormValidForCalculation() {
        const customerName = this.form.querySelector('#customer-name').value;
        const customerPhone = this.form.querySelector('#customer-phone').value;
        const projectType = this.form.querySelector('#project-type').value;
        const workType = this.form.querySelector('#work-type').value;
        const workPrice = this.form.querySelector('#work-price').value;
        const workQuantity = this.form.querySelector('#work-quantity').value;
        const quantityUnit = this.form.querySelector('#quantity-unit').value;
        const workPercentage = this.form.querySelector('#work-percentage').value;
        
        return customerName && customerPhone && projectType && workType && workPrice && workQuantity && quantityUnit && workPercentage;
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

        // Area validation
        if (fieldName === 'projectArea' && value) {
            const area = parseFloat(value);
            if (isNaN(area) || area < 1 || area > 10000) {
                isValid = false;
                errorMessage = 'שטח הפרויקט חייב להיות בין 1 ל-10,000 מ"ר';
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

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value.trim();
        }
        
        // Get additional quotes data
        this.additionalQuotes.forEach((quote, index) => {
            const quoteId = quote.id;
            const quoteElement = document.getElementById(quoteId);
            if (quoteElement) {
                const inputs = quoteElement.querySelectorAll('input, select');
                inputs.forEach(input => {
                    const name = input.name;
                    if (name) {
                        data[name] = input.value;
                    }
                });
            }
        });
        
        return data;
    }

    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3);
            }
        }
        
        input.value = value;
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('he-IL', {
            style: 'currency',
            currency: 'ILS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
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

    // Send quote via email (simulated)
    async sendQuote() {
        if (!this.currentQuote) {
            this.showFormError('אנא חשב הצעת מחיר תחילה');
            return;
        }

        const submitButton = document.querySelector('.btn-secondary');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'שולח...';
        submitButton.classList.add('loading');

        try {
            // Simulate sending quote
            await this.simulateQuoteSubmission();
            
            // Success
            if (window.ContractorApp && window.ContractorApp.showToast) {
                window.ContractorApp.showToast('הצעת המחיר נשלחה בהצלחה! נחזור אליכם בהקדם.', 'success');
            } else {
                alert('הצעת המחיר נשלחה בהצלחה! נחזור אליכם בהקדם.');
            }
            
        } catch (error) {
            // Error
            this.showFormError('שגיאה בשליחת הצעת המחיר. אנא נסה שוב.');
            console.error('Quote submission error:', error);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.classList.remove('loading');
        }
    }

    async simulateQuoteSubmission() {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (95% success rate)
                if (Math.random() > 0.05) {
                    resolve(this.currentQuote);
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 2000);
        });
    }

    // Public method to get current quote
    getCurrentQuote() {
        return this.currentQuote;
    }

    // Add additional quote
    addAdditionalQuote() {
        this.quoteCounter++;
        const quoteId = `quote-${this.quoteCounter}`;
        
        const additionalQuotesDiv = document.getElementById('additional-quotes');
        const quoteDiv = document.createElement('div');
        quoteDiv.className = 'additional-quote';
        quoteDiv.id = quoteId;
        
        quoteDiv.innerHTML = `
            <div class="additional-quote-header">
                <h4>הצעה נוספת #${this.quoteCounter}</h4>
                <button type="button" class="btn-remove-quote" onclick="window.QuoteManager.removeAdditionalQuote('${quoteId}')">×</button>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>סוג פרויקט</label>
                    <select name="additionalProjectType_${this.quoteCounter}">
                        <option value="">בחר סוג פרויקט</option>
                        <option value="villa">וילה</option>
                        <option value="house">בית</option>
                        <option value="yard">חצר</option>
                        <option value="roof">גג</option>
                        <option value="other">אחר</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>סוג עבודה</label>
                    <select name="additionalWorkType_${this.quoteCounter}">
                        <option value="">בחר סוג עבודה</option>
                        <option value="gypsum">גבס</option>
                        <option value="plaster">שפכטל</option>
                        <option value="paint">צבע</option>
                        <option value="insulation">איטום</option>
                        <option value="reinforcement">חיזוק</option>
                        <option value="demolition">הריסה</option>
                        <option value="electrical">חשמל</option>
                        <option value="plumbing">ניאגרה</option>
                        <option value="other-work">אחר</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>מחיר ליחידה (₪)</label>
                    <input type="number" name="additionalWorkPrice_${this.quoteCounter}" min="0" step="0.01" placeholder="הכנס מחיר">
                </div>
                <div class="form-group">
                    <label>כמות</label>
                    <input type="number" name="additionalWorkQuantity_${this.quoteCounter}" min="0" step="0.01" placeholder="הכנס כמות">
                </div>
                <div class="form-group">
                    <label>יחידה</label>
                    <select name="additionalQuantityUnit_${this.quoteCounter}">
                        <option value="">בחר יחידה</option>
                        <option value="sqm">מ"ר</option>
                        <option value="sqcm">מ"א</option>
                        <option value="linear">י"ח</option>
                        <option value="meter">מטר</option>
                        <option value="other-unit">אחר</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>אחוז עבודה</label>
                    <select name="additionalWorkPercentage_${this.quoteCounter}">
                        <option value="">בחר אחוז</option>
                        <option value="50">50%</option>
                        <option value="60">60%</option>
                        <option value="70">70%</option>
                        <option value="80">80%</option>
                        <option value="90">90%</option>
                        <option value="100">100%</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>הנחה</label>
                    <select name="additionalSpecialDiscount_${this.quoteCounter}">
                        <option value="0">ללא הנחה</option>
                        <option value="10">10%</option>
                        <option value="15">15%</option>
                    </select>
                </div>
            </div>
        `;
        
        additionalQuotesDiv.appendChild(quoteDiv);
        
        // Store quote data
        this.additionalQuotes.push({
            id: quoteId,
            projectType: 'villa',
            workPercentage: '100',
            workType: 'gypsum',
            workPrice: '0',
            workQuantity: '0',
            quantityUnit: 'sqm',
            specialDiscount: '0'
        });
    }

    // Remove additional quote
    removeAdditionalQuote(quoteId) {
        const quoteElement = document.getElementById(quoteId);
        if (quoteElement) {
            quoteElement.remove();
        }
        
        // Remove from array
        this.additionalQuotes = this.additionalQuotes.filter(quote => quote.id !== quoteId);
    }

    // Save quote
    saveQuote() {
        if (!this.currentQuote) {
            this.showFormError('אין הצעת מחיר לשמירה');
            return;
        }

        const saveBtn = document.getElementById('save-quote-btn');
        const originalText = saveBtn.textContent;
        
        // Show loading state
        saveBtn.disabled = true;
        saveBtn.textContent = 'שומר...';
        saveBtn.classList.add('loading');

        try {
            // Create quote data for saving
            const quoteData = {
                date: new Date().toLocaleDateString('he-IL'),
                customer: this.currentQuote.formData.name || 'לא צוין',
                quotes: this.currentQuote.quotes,
                subtotal: this.currentQuote.subtotal,
                vatAmount: this.currentQuote.vatAmount,
                totalWithVat: this.currentQuote.totalWithVat,
                vatRate: this.currentQuote.vatRate
            };

            // Save to localStorage (you can change this to save to server)
            const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]');
            savedQuotes.push({
                id: Date.now(),
                ...quoteData
            });
            localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));

            // Show success message
            this.showFormSuccess('הצעת המחיר נשמרה בהצלחה!');
            
        } catch (error) {
            this.showFormError('שגיאה בשמירת הצעת המחיר');
            console.error('Save quote error:', error);
        } finally {
            // Reset button state
            saveBtn.disabled = false;
            saveBtn.textContent = originalText;
            saveBtn.classList.remove('loading');
        }
    }

    // Create new quote
    createNewQuote() {
        // Reset form
        this.form.reset();
        
        // Clear additional quotes
        this.additionalQuotes = [];
        this.quoteCounter = 0;
        const additionalQuotesDiv = document.getElementById('additional-quotes');
        if (additionalQuotesDiv) {
            additionalQuotesDiv.innerHTML = '';
        }
        
        // Hide quote result
        const quoteResult = document.getElementById('quote-result');
        if (quoteResult) {
            quoteResult.style.display = 'none';
        }
        
        // Clear current quote
        this.currentQuote = null;
        
        // Show success message
        this.showFormSuccess('הצעת מחיר חדשה נוצרה');
        
        // Scroll to top of form
        this.form.scrollIntoView({ behavior: 'smooth' });
    }

    // Print quote
    printQuote() {
        const quoteResult = document.getElementById('quote-result');
        if (!quoteResult) return;
        
        // Create print window
        const printWindow = window.open('', '_blank');
        const printContent = `
            <!DOCTYPE html>
            <html dir="rtl" lang="he">
            <head>
                <meta charset="UTF-8">
                <title>הצעת מחיר</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; direction: rtl; }
                    .quote-header { text-align: center; margin-bottom: 30px; }
                    .quote-header h1 { color: #2c5aa0; margin-bottom: 10px; }
                    .quote-info { margin-bottom: 20px; }
                    .quote-details { margin-bottom: 30px; }
                    .quote-detail-item { margin-bottom: 10px; }
                    .quote-breakdown { margin-bottom: 30px; }
                    .quote-table-container { overflow: visible; }
                    .quote-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    .quote-table th { background-color: #2c5aa0; color: white; padding: 10px; text-align: center; border: 1px solid #ddd; }
                    .quote-table td { padding: 8px; text-align: center; border: 1px solid #ddd; }
                    .quote-table tbody tr:nth-child(even) { background-color: #f8f9fa; }
                    .quote-table tfoot tr { background-color: #e9ecef; font-weight: bold; }
                    .quote-table tfoot tr.total-row { background-color: #2c5aa0; color: white; }
                    .quote-note { background-color: #f8f9fa; padding: 15px; margin-top: 20px; }
                    @media print { 
                        body { margin: 0; }
                        .quote-table { page-break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                ${quoteResult.innerHTML}
            </body>
            </html>
        `;
        
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    }
}

// Initialize quote manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.QuoteManager = new QuoteManager();
});

// Add CSS for quote page
const quoteCSS = `
<style>
.quote-content {
    max-width: 1000px;
    margin: 0 auto;
}

.quote-intro {
    text-align: center;
    margin-bottom: 3rem;
}

.quote-intro h2 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.quote-calculator {
    background-color: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
}

.form-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
}

.form-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.form-section h3 {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
}

.checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 0.5rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--text-color);
}

.checkbox-label input[type="checkbox"] {
    display: none;
}

.checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid var(--border-color);
    border-radius: 4px;
    margin-left: 0.5rem;
    position: relative;
    transition: var(--transition);
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
}

.btn-large {
    padding: 15px 30px;
    font-size: 1.1rem;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    display: block;
}

.quote-result {
    background-color: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    margin-top: 2rem;
}

.quote-result h3 {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    text-align: center;
}

.quote-breakdown {
    margin-bottom: 2rem;
}

.quote-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
}

.quote-item:last-child {
    border-bottom: none;
}

.quote-item.total {
    font-weight: bold;
    font-size: 1.1rem;
    color: var(--primary-color);
    border-top: 2px solid var(--primary-color);
    margin-top: 1rem;
    padding-top: 1rem;
}

.quote-label {
    color: var(--text-color);
}

.quote-value {
    font-weight: 500;
    color: var(--primary-color);
}

.quote-note {
    background-color: var(--background-light);
    padding: 1rem;
    border-radius: var(--border-radius);
    margin-bottom: 1.5rem;
}

.quote-note p {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-light);
}

.quote-note p:last-child {
    margin-bottom: 0;
}

/* Additional quote styles */
.additional-quote {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: var(--border-radius);
    padding: 1.5rem;
    margin-bottom: 1rem;
}

.additional-quote-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.additional-quote-header h4 {
    color: var(--primary-color);
    margin: 0;
}

.btn-remove-quote {
    background: var(--accent-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-remove-quote:hover {
    background: #d63031;
}

.additional-quote-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.quantity-input-group {
    display: flex;
    gap: 0.5rem;
}

.quantity-input-group input {
    flex: 1;
}

.quantity-input-group select {
    flex: 0 0 auto;
    min-width: 80px;
}

.form-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
}

/* Quote result styles */
.quote-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--primary-color);
}

/* Quote table styles */
.quote-table-container {
    overflow-x: auto;
    margin: 1rem 0;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.quote-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    font-size: 0.9rem;
}

.quote-table th {
    background-color: var(--primary-color);
    color: white;
    padding: 12px 8px;
    text-align: center;
    font-weight: 600;
    border: 1px solid #ddd;
    white-space: nowrap;
}

.quote-table td {
    padding: 10px 8px;
    text-align: center;
    border: 1px solid #ddd;
    vertical-align: middle;
}

.quote-table tbody tr:nth-child(even) {
    background-color: #f8f9fa;
}

.quote-table tbody tr:hover {
    background-color: #e3f2fd;
}

.quote-table tfoot tr {
    background-color: var(--background-light);
    font-weight: bold;
}

.quote-table tfoot tr.total-row {
    background-color: var(--primary-color);
    color: white;
}

.quote-table tfoot tr.total-row td {
    border-color: var(--primary-color);
}

.quote-table .row-number {
    font-weight: bold;
    color: var(--primary-color);
    width: 40px;
}

.quote-table .project-type,
.quote-table .work-type {
    text-align: right;
    min-width: 80px;
}

.quote-table .work-percentage {
    color: var(--secondary-color);
    font-weight: 500;
}

.quote-table .unit-price,
.quote-table .amount,
.quote-table .vat,
.quote-table .total {
    font-weight: 500;
    color: var(--primary-color);
}

.quote-table .quantity {
    font-weight: 500;
}

.quote-table .unit {
    color: var(--text-light);
    font-size: 0.8rem;
}

.quote-table .discount {
    color: var(--accent-color);
    font-weight: 500;
}

.quote-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.quote-details {
    background-color: var(--background-light);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
}

.quote-details h4 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.quote-detail-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

.detail-label {
    font-weight: 500;
    color: var(--text-color);
}

.detail-value {
    color: var(--primary-color);
    font-weight: 500;
}

.quote-item-detail {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1rem;
    margin-bottom: 1rem;
}

.quote-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.item-title {
    font-weight: 500;
    color: var(--primary-color);
}

.item-number {
    background-color: var(--primary-color);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
}

.quote-item-details {
    margin-top: 0.5rem;
}

.detail-row {
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
}

.detail-row.total {
    font-weight: bold;
    color: var(--primary-color);
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border-color);
}

.quote-summary {
    background-color: var(--background-light);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    margin-top: 1rem;
}

.quote-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.quote-actions .btn {
    min-width: 150px;
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

/* Copyright page styles */
.copyright-content {
    max-width: 800px;
    margin: 0 auto;
}

.copyright-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
}

.copyright-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.copyright-section h2 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.3rem;
}

.copyright-section p {
    margin-bottom: 1rem;
    line-height: 1.6;
}

.copyright-section ul {
    margin: 1rem 0;
    padding-right: 1.5rem;
}

.copyright-section li {
    margin-bottom: 0.5rem;
    color: var(--text-light);
}

.copyright-section .contact-info {
    background-color: var(--background-light);
    padding: 1rem;
    border-radius: var(--border-radius);
    margin-top: 1rem;
}

.copyright-section .contact-info p {
    margin-bottom: 0.5rem;
}

.copyright-footer {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid var(--primary-color);
}

.copyright-footer p {
    margin-bottom: 0.5rem;
    color: var(--text-light);
}

@media (max-width: 768px) {
    .quote-calculator,
    .quote-result {
        padding: 1rem;
    }
    
    .checkbox-group {
        grid-template-columns: 1fr;
    }
    
    .quote-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
    }
    
    .quote-value {
        font-weight: bold;
    }
    
    /* Mobile table styles */
    .quote-table {
        font-size: 0.8rem;
    }
    
    .quote-table th,
    .quote-table td {
        padding: 8px 4px;
    }
    
    .quote-table th:nth-child(n+6),
    .quote-table td:nth-child(n+6) {
        display: none;
    }
    
    .quote-table th:nth-child(1),
    .quote-table td:nth-child(1),
    .quote-table th:nth-child(2),
    .quote-table td:nth-child(2),
    .quote-table th:nth-child(3),
    .quote-table td:nth-child(3),
    .quote-table th:nth-child(4),
    .quote-table td:nth-child(4),
    .quote-table th:nth-child(5),
    .quote-table td:nth-child(5) {
        display: table-cell;
    }
    
    .quote-table tfoot tr td:nth-child(n+6) {
        display: none;
    }
    
    .quote-table tfoot tr td:nth-child(1),
    .quote-table tfoot tr td:nth-child(2),
    .quote-table tfoot tr td:nth-child(3),
    .quote-table tfoot tr td:nth-child(4),
    .quote-table tfoot tr td:nth-child(5) {
        display: table-cell;
    }
}

@media (max-width: 480px) {
    .quote-table {
        font-size: 0.7rem;
    }
    
    .quote-table th,
    .quote-table td {
        padding: 6px 2px;
    }
    
    .quote-table th:nth-child(n+4),
    .quote-table td:nth-child(n+4) {
        display: none;
    }
    
    .quote-table th:nth-child(1),
    .quote-table td:nth-child(1),
    .quote-table th:nth-child(2),
    .quote-table td:nth-child(2),
    .quote-table th:nth-child(3),
    .quote-table td:nth-child(3) {
        display: table-cell;
    }
}
</style>
`;

// Add quote CSS to head
document.head.insertAdjacentHTML('beforeend', quoteCSS);

// Export for global access
window.QuoteManager = QuoteManager;
