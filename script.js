// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.5)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = '';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// FAQ Toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', function() {
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherToggle = otherItem.querySelector('.faq-toggle');
                otherAnswer.classList.remove('active');
                otherToggle.textContent = '+';
            });
            
            // Toggle current item
            if (!isActive) {
                answer.classList.add('active');
                toggle.textContent = '−';
            }
        });
    });

    // Handle enhance form submission
    if (enhanceForm) {
        enhanceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(enhanceForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const requiredFields = ['company', 'contact-person', 'email', 'phone', 'category', 'package'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!data[field]) {
                    isValid = false;
                    const input = enhanceForm.querySelector(`[name="${field}"]`);
                    if (input) {
                        input.style.borderColor = '#dc3545';
                    }
                }
            });
            
            if (isValid) {
                // Success message
                const packageName = data.package === 'value-enhancers' ? 'Value Enhancers' : 'Wall of Excellence';
                alert(`🎉 Application Submitted Successfully!\n\n📦 Package: ${packageName}\n👤 Contact: ${data['contact-person']}\n🏢 Company: ${data.company}\n\nThank you for your application! We will contact you soon.`);
                
                // Reset form and close modal
                enhanceForm.reset();
                enhanceModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            } else {
                alert('Please fill in all required fields.');
            }
        });
        
        // Remove error styling on input
        const enhanceInputs = enhanceForm.querySelectorAll('input, select, textarea');
        enhanceInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#e9ecef';
            });
        });
    }
});

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.application-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const requiredFields = ['company', 'contact-person', 'email', 'phone', 'category', 'package'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!data[field]) {
                    isValid = false;
                    const input = form.querySelector(`[name="${field}"]`);
                    input.style.borderColor = '#dc3545';
                }
            });
            
            if (isValid) {
                // Here you would typically send the data to your server
                alert('Thank you for your application! We will contact you soon.');
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
        
        // Remove error styling on input
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#e9ecef';
            });
        });
    }
});

// Interactive Calendar
class InteractiveCalendar {
    constructor() {
        this.currentDate = new Date();
        // Initialize to current month
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.selectedDate = null;
        this.selectedTime = null;
        
        this.init();
    }
    
    init() {
        this.renderCalendar();
        this.bindEvents();
    }
    
    bindEvents() {
        // Month navigation
        document.querySelectorAll('.month-nav').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.textContent === '<') {
                    this.previousMonth();
                } else {
                    this.nextMonth();
                }
                this.renderCalendar();
            });
        });
        
        // Time slot selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('time-slot')) {
                this.selectTimeSlot(e.target);
            }
        });
        
        // Book slot button
        const bookSlotBtn = document.getElementById('bookSlotBtn');
        if (bookSlotBtn) {
            bookSlotBtn.addEventListener('click', () => {
                this.bookSlot();
            });
        }
    }
    
    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
    }
    
    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
    }
    
    renderCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        const monthYear = document.querySelector('.month-year');
        
        if (!calendarGrid || !monthYear) return;
        
        // Clear existing days (keep headers)
        const headers = calendarGrid.querySelectorAll('.day-header');
        calendarGrid.innerHTML = '';
        headers.forEach(header => calendarGrid.appendChild(header));
        
        // Update month/year display
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        monthYear.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
        
        // Get first day of month and days in month
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day disabled';
            emptyDay.textContent = '';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // All dates are selectable
            dayElement.addEventListener('click', () => this.selectDate(day));
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    selectDate(day) {
        // Remove previous selection
        document.querySelectorAll('.calendar-day.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Clear previous time selection
        document.querySelectorAll('.time-slot.selected').forEach(el => {
            el.classList.remove('selected');
        });
        this.selectedTime = null;
        
        // Add selection to clicked day
        const dayElements = document.querySelectorAll('.calendar-day');
        dayElements.forEach(el => {
            if (el.textContent == day && !el.classList.contains('disabled')) {
                el.classList.add('selected');
                this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
                this.showSelectedDateInfo();
                this.resetBookingButton();
            }
        });
    }
    
    showSelectedDateInfo() {
        const selectedDateInfo = document.getElementById('selectedDateInfo');
        const selectedDateText = document.getElementById('selectedDateText');
        const bookSlotBtn = document.getElementById('bookSlotBtn');
        
        if (this.selectedDate && selectedDateInfo && selectedDateText && bookSlotBtn) {
            const dateString = this.selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            selectedDateText.textContent = dateString;
            selectedDateInfo.style.display = 'block';
            this.resetBookingButton();
        }
    }
    
    resetBookingButton() {
        const bookSlotBtn = document.getElementById('bookSlotBtn');
        if (bookSlotBtn) {
            if (!this.selectedDate) {
                bookSlotBtn.disabled = true;
                bookSlotBtn.textContent = 'Select a Date First';
            } else if (!this.selectedTime) {
                bookSlotBtn.disabled = true;
                bookSlotBtn.textContent = 'Select a Time Slot';
            } else {
                bookSlotBtn.disabled = false;
                bookSlotBtn.textContent = 'Book Your Slot';
            }
        }
    }
    
    selectTimeSlot(timeSlot) {
        // Only allow time selection if a date is already selected
        if (!this.selectedDate) {
            alert('Please select a date first!');
            return;
        }
        
        // Remove previous selection
        document.querySelectorAll('.time-slot.selected').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Add selection to clicked time slot
        timeSlot.classList.add('selected');
        this.selectedTime = timeSlot.dataset.time;
        
        // Update booking button
        this.resetBookingButton();
    }
    
    bookSlot() {
        if (this.selectedDate && this.selectedTime) {
            const dateString = this.selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            const timeString = this.selectedTime.replace(':', ':');
            const time12Hour = new Date(`2000-01-01 ${timeString}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            
            alert(`🎉 Booking Confirmed!\n\n📅 Date: ${dateString}\n⏰ Time: ${time12Hour}\n🏢 Venue: Engimech Exhibition, Ahmedabad\n\nYour slot has been reserved successfully!`);
        } else if (this.selectedDate) {
            alert('Please select a time slot first!');
        } else {
            alert('Please select a date first!');
        }
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveCalendar();
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('applyModal');
    const packagesModal = document.getElementById('packagesModal');
    const enhanceModal = document.getElementById('enhanceModal');
    const wallExcellenceModal = document.getElementById('wallExcellenceModal');
    const openModalBtn = document.querySelector('.hero-button.primary');
    const openPackagesBtn = document.querySelector('.hero-button.secondary');
    const enhanceApplyBtn = document.querySelector('.enhance-apply-btn');
    const wallExcellenceBtn = document.querySelector('.wall-excellence-btn');
    const closeBtn = document.querySelector('.close');
    const closePackagesBtn = document.querySelector('.close-packages');
    const closeEnhanceBtn = document.querySelector('.close-enhance');
    const closeWallBtn = document.querySelector('.close-wall');
    const modalForm = document.querySelector('.modal-application-form');
    const enhanceForm = document.querySelector('.enhance-application-form');
    const wallForm = document.querySelector('.wall-excellence-application-form');

    // Open modal when clicking "Apply to Participate" button
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }


    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }

    // Close packages modal when clicking the X button
    if (closePackagesBtn) {
        closePackagesBtn.addEventListener('click', function() {
            packagesModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }

    // Open enhance modal when clicking "Enhance Your Presence" button
    if (enhanceApplyBtn) {
        enhanceApplyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            enhanceModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close enhance modal when clicking the X button
    if (closeEnhanceBtn) {
        closeEnhanceBtn.addEventListener('click', function() {
            enhanceModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }

    // Open wall excellence modal when clicking "Claim Your Spot" button
    if (wallExcellenceBtn) {
        wallExcellenceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            wallExcellenceModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close wall excellence modal when clicking the X button
    if (closeWallBtn) {
        closeWallBtn.addEventListener('click', function() {
            wallExcellenceModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        if (e.target === packagesModal) {
            packagesModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        if (e.target === enhanceModal) {
            enhanceModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        if (e.target === wallExcellenceModal) {
            wallExcellenceModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        if (e.key === 'Escape' && packagesModal.style.display === 'block') {
            packagesModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        if (e.key === 'Escape' && enhanceModal.style.display === 'block') {
            enhanceModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        if (e.key === 'Escape' && wallExcellenceModal.style.display === 'block') {
            wallExcellenceModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Handle modal form submission
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(modalForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const requiredFields = ['company', 'contact-person', 'email', 'phone', 'category', 'package'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!data[field]) {
                    isValid = false;
                    const input = modalForm.querySelector(`[name="${field}"]`);
                    if (input) {
                        input.style.borderColor = '#dc3545';
                    }
                }
            });
            
            if (isValid) {
                // Here you would typically send the data to your server
                alert('Thank you for your application! We will contact you soon.');
                modalForm.reset();
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            } else {
                alert('Please fill in all required fields.');
            }
        });
        
        // Remove error styling on input
        const inputs = modalForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#e9ecef';
            });
        });
    }

    // Initialize package forms when packages modal is opened
    function initializePackageForms() {
        // Handle package form toggle buttons
        const packageToggleBtns = document.querySelectorAll('.package-toggle-form');
        packageToggleBtns.forEach(btn => {
            // Remove existing event listeners to avoid duplicates
            btn.replaceWith(btn.cloneNode(true));
        });
        
        // Re-select buttons after cloning
        const newPackageToggleBtns = document.querySelectorAll('.package-toggle-form');
        newPackageToggleBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const packageType = this.getAttribute('data-package');
                const formElement = document.getElementById(`form-${packageType}`);
                const ctaElement = this.parentElement;
                
                if (formElement && ctaElement) {
                    if (formElement.style.display === 'none' || formElement.style.display === '') {
                        // Show form
                        formElement.style.display = 'block';
                        ctaElement.style.display = 'none';
                    } else {
                        // Hide form
                        formElement.style.display = 'none';
                        ctaElement.style.display = 'block';
                    }
                }
            });
        });

        // Handle package form submissions
        const packageForms = document.querySelectorAll('.package-application-form');
        packageForms.forEach(form => {
            // Remove existing event listeners to avoid duplicates
            form.replaceWith(form.cloneNode(true));
        });
        
        // Re-select forms after cloning
        const newPackageForms = document.querySelectorAll('.package-application-form');
        newPackageForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                const packageType = form.getAttribute('data-package');
                
                // Simple validation
                const requiredFields = ['company', 'contact-person', 'email', 'phone', 'category'];
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!data[field]) {
                        isValid = false;
                        const input = form.querySelector(`[name="${field}"]`);
                        if (input) {
                            input.style.borderColor = '#ff6f00';
                        }
                    }
                });
                
                if (isValid) {
                    // Success message
                    const packageName = packageType === 'value-enhancers' ? 'Value Enhancers' : 'Wall of Excellence';
                    alert(`🎉 Application Submitted Successfully!\n\n📦 Package: ${packageName}\n👤 Contact: ${data['contact-person']}\n🏢 Company: ${data.company}\n\nThank you for your application! We will contact you soon.`);
                    
                    // Reset form and hide it
                    form.reset();
                    const formElement = document.getElementById(`form-${packageType}`);
                    const ctaElement = document.querySelector(`[data-package="${packageType}"]`).parentElement;
                    
                    if (formElement && ctaElement) {
                        formElement.style.display = 'none';
                        ctaElement.style.display = 'block';
                    }
                } else {
                    alert('Please fill in all required fields.');
                }
            });
            
            // Remove error styling on input
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });
    });

    // Handle wall excellence form submission
    if (wallForm) {
        wallForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(wallForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const requiredFields = ['company', 'contact-person', 'email', 'phone', 'category', 'package'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!data[field]) {
                    isValid = false;
                    const input = wallForm.querySelector(`[name="${field}"]`);
                    if (input) {
                        input.style.borderColor = '#dc3545';
                    }
                }
            });
            
            if (isValid) {
                // Success message
                const packageName = data.package === 'value-enhancers' ? 'Value Enhancers' : 'Wall of Excellence';
                alert(`🎉 Application Submitted Successfully!\n\n📦 Package: ${packageName}\n👤 Contact: ${data['contact-person']}\n🏢 Company: ${data.company}\n\nThank you for your application! We will contact you soon.`);
                
                // Reset form and close modal
                wallForm.reset();
                wallExcellenceModal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            } else {
                alert('Please fill in all required fields.');
            }
        });
        
        // Remove error styling on input
        const wallInputs = wallForm.querySelectorAll('input, select, textarea');
        wallInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#e9ecef';
            });
        });
    }
});
    }

    // Handle "View Packages" button to scroll to packages section
    if (openPackagesBtn) {
        openPackagesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const packagesSection = document.querySelector('.participation-packages');
            if (packagesSection) {
                packagesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});
