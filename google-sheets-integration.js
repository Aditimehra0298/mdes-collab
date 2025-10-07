// Google Sheets Integration for MDEC Website
// This file handles sending form data to Google Sheets via Google Apps Script

class GoogleSheetsIntegration {
    constructor() {
        // Replace this URL with your deployed Google Apps Script web app URL
        this.WEB_APP_URL = 'https://script.google.com/macros/s/AKfycby_B_BwguUJLWV2s0_ViaF9g6DEe5fAeCf0d7i3OYXn1r_zDz29TSUmCcCNAvx0Dw3czw/exec';
        this.isConfigured = this.WEB_APP_URL !== 'YOUR_WEB_APP_URL_HERE';
    }

    // Send form data to Google Sheets
    async sendFormData(formData, formType = 'General Form') {
        if (!this.isConfigured) {
            console.warn('Google Sheets integration not configured. Please set WEB_APP_URL.');
            return { success: false, error: 'Integration not configured' };
        }

        try {
            const payload = {
                ...formData,
                formType: formType,
                timestamp: new Date().toISOString()
            };

            console.log('Sending data to Google Sheets:', payload);

            const response = await fetch(this.WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors', // Change to no-cors to avoid CORS issues
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            // With no-cors mode, we can't read the response, so we assume success
            console.log('Form data sent to Google Sheets (no-cors mode)');
            return { success: true, data: { message: 'Data sent successfully' } };

        } catch (error) {
            console.error('Network error sending data to Google Sheets:', error);
            return { success: false, error: error.message };
        }
    }

    // Send application form data
    async sendApplicationForm(formData) {
        return await this.sendFormData(formData, 'Application Form');
    }

    // Send package form data
    async sendPackageForm(formData, packageType) {
        const formType = packageType === 'value-enhancers' ? 'Value Enhancers Package' : 'Wall of Excellence Package';
        return await this.sendFormData(formData, formType);
    }

    // Send calendar booking data
    async sendCalendarBooking(bookingData) {
        const formData = {
            selectedDate: bookingData.date,
            selectedTime: bookingData.time,
            bookingType: 'Calendar Booking',
            additionalInfo: `Venue: Engimech Exhibition, Ahmedabad`,
            // Include contact information if available
            contactPerson: bookingData.name || '',
            email: bookingData.email || '',
            phone: bookingData.phone || '',
            company: bookingData.company || '',
            message: bookingData.message || ''
        };
        return await this.sendFormData(formData, 'Calendar Booking');
    }

    // Test the integration
    async testIntegration() {
        const testData = {
            company: 'Test Company',
            contactPerson: 'Test Person',
            email: 'test@example.com',
            phone: '+91-9876543210',
            category: 'Test Category',
            package: 'Test Package',
            message: 'This is a test submission'
        };

        return await this.sendFormData(testData, 'Test Form');
    }
}

// Create global instance
const googleSheetsIntegration = new GoogleSheetsIntegration();

// Utility function to get form data as object
function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// Utility function to show loading state
function showLoadingState(button, text = 'Submitting...') {
    const originalText = button.textContent;
    button.textContent = text;
    button.disabled = true;
    
    return function hideLoadingState() {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GoogleSheetsIntegration, googleSheetsIntegration, getFormData, showLoadingState };
}
