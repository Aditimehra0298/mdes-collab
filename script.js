// Mobile Navigation Menu Functions
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Thank You Modal Functions
function showThankYouModal() {
    console.log('showThankYouModal called');
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        console.log('Thank you modal displayed');
    } else {
        console.error('Thank you modal not found');
    }
}

function closeThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Booking Form Modal Functions
function showBookingFormModal(selectedDate, selectedTime) {
    const modal = document.getElementById('bookingFormModal');
    const dateDisplay = document.getElementById('bookingDateDisplay');
    const timeDisplay = document.getElementById('bookingTimeDisplay');
    
    if (modal && dateDisplay && timeDisplay) {
        // Store the booking details for later use
        window.currentBookingDetails = {
            date: selectedDate,
            time: selectedTime
        };
        
        // Update the display
        dateDisplay.textContent = selectedDate;
        timeDisplay.textContent = selectedTime;
        
        // Show the modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeBookingFormModal() {
    const modal = document.getElementById('bookingFormModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close thank you modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('thankYouModal');
    if (event.target === modal) {
        closeThankYouModal();
    }
});

// Close thank you modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeThankYouModal();
    }
});

// MDE Evaluation Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Accordion functionality for MDE Evaluation
    const accordionButtons = document.querySelectorAll('#criteria-accordion .accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            
            // Close other accordions
            accordionButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.classList.remove('active');
                    otherButton.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current accordion
            button.classList.toggle('active');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
    });

    // 8 Pillars Scroll Animation
    const pillarCards = document.querySelectorAll('.pillar-card');
    
    // Set up the Intersection Observer for pillar cards
    const pillarObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            // When a card enters the viewport
            if (entry.isIntersecting) {
                // Add a staggered delay to each card for a nice effect
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100); // 100ms delay between each card animation
                
                // Stop observing the card once it's visible
                pillarObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger animation when 10% of the card is visible
    });

    // Observe each pillar card
    pillarCards.forEach(card => {
        pillarObserver.observe(card);
    });
});

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
    const enhanceForm = document.querySelector('.enhance-application-form');
    const enhanceModal = document.getElementById('enhanceModal');

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
        enhanceForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(enhanceForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const requiredFields = ['company', 'contact-person', 'email', 'phone', 'category'];
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
                // Show loading state
                const submitButton = enhanceForm.querySelector('.submit-button');
                const hideLoading = function() { 
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Submit';
                    }
                };
                
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Submitting...';
                }
                
                try {
                    if (typeof googleSheetsIntegration !== 'undefined') {
                        const result = await googleSheetsIntegration.sendPackageForm(data, data.package);
                        if (result.success) {
                            console.log('Enhance form data saved to Google Sheets');
                        } else {
                            console.error('Failed to save enhance form data:', result.error);
                        }
                    } else {
                        console.warn('Google Sheets integration not available');
                    }
                } catch (error) {
                    console.error('Error processing package form:', error);
                } finally {
                    hideLoading();
                }
                
                // Reset form and close modal
                enhanceForm.reset();
                if (enhanceModal) {
                    enhanceModal.style.display = 'none';
                }
                document.body.style.overflow = 'auto'; // Restore scrolling
                showThankYouModal();
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
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const requiredFields = ['company', 'contact-person', 'email', 'phone', 'category'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!data[field]) {
                    isValid = false;
                    const input = form.querySelector(`[name="${field}"]`);
                    input.style.borderColor = '#dc3545';
                }
            });
            
            if (isValid) {
                // Send data to Google Sheets
                const submitButton = form.querySelector('.submit-button');
                const hideLoading = function() { 
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Apply for MDEC Participation';
                    }
                };
                
                // Show loading state
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Submitting...';
                }
                
                try {
                    // For now, just show thank you modal without Google Sheets integration
                    // This ensures the form works even if Google Sheets integration fails
                    console.log('Form submitted successfully');
                    form.reset();
                    showThankYouModal();
                } catch (error) {
                    console.error('Error processing form:', error);
                    form.reset();
                    showThankYouModal();
                } finally {
                    hideLoading();
                }
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
        
        // Clear existing days
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });

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
    
    async bookSlot() {
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
            
            // Show booking form modal instead of directly booking
            showBookingFormModal(dateString, time12Hour);
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
    console.log('Modal functionality DOMContentLoaded started');
    
    const modal = document.getElementById('applyModal');
    // const packagesModal = document.getElementById('packagesModal'); // Removed - packages modal no longer exists
    const enhanceModal = document.getElementById('enhanceModal');
    const wallExcellenceModal = document.getElementById('wallExcellenceModal');
    const openModalBtn = document.querySelector('.hero-button.primary');
    // const openPackagesBtn = document.querySelector('.hero-button.secondary'); // Removed - no longer needed
    const enhanceApplyBtn = document.querySelector('.enhance-apply-btn');
    const wallExcellenceBtn = document.querySelector('.wall-excellence-btn');
    const closeBtn = document.querySelector('.close');
    // const closePackagesBtn = document.querySelector('.close-packages'); // Removed - packages modal no longer exists
    const closeEnhanceBtn = document.querySelector('.close-enhance');
    const closeWallBtn = document.querySelector('.close-wall');
    const modalForm = document.querySelector('.modal-application-form');
    const enhanceForm = document.querySelector('.enhance-application-form');
    const wallForm = document.querySelector('.wall-excellence-application-form');
    const bookingForm = document.getElementById('bookingForm');
    
    console.log('Elements found:', {
        modal: !!modal,
        openModalBtn: !!openModalBtn,
        enhanceApplyBtn: !!enhanceApplyBtn,
        wallExcellenceBtn: !!wallExcellenceBtn
    });

    // Open modal when clicking "Apply to Participate" button
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Apply button clicked, opening modal');
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                console.error('Modal element not found');
            }
        });
    } else {
        console.error('Apply button not found');
    }

    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }

    // Packages modal close functionality removed - modal no longer exists

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
        // Packages modal click-outside functionality removed - modal no longer exists
        if (e.target === enhanceModal) {
            enhanceModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        if (e.target === wallExcellenceModal) {
            wallExcellenceModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        if (e.target === document.getElementById('bookingFormModal')) {
            closeBookingFormModal();
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        // Packages modal escape key functionality removed - modal no longer exists
        if (e.key === 'Escape' && enhanceModal && enhanceModal.style.display === 'block') {
            enhanceModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        if (e.key === 'Escape' && wallExcellenceModal && wallExcellenceModal.style.display === 'block') {
            wallExcellenceModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
        if (e.key === 'Escape' && document.getElementById('bookingFormModal') && document.getElementById('bookingFormModal').style.display === 'block') {
            closeBookingFormModal();
        }
    });

    // Handle modal form submission
    if (modalForm) {
        modalForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(modalForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const requiredFields = ['company', 'contact-person', 'email', 'phone', 'category'];
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
                // Show loading state
                const submitButton = modalForm.querySelector('.submit-button');
                if(submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Submitting...';
                }

                try {
                    if (typeof googleSheetsIntegration !== 'undefined') {
                        const result = await googleSheetsIntegration.sendApplicationForm(data);
                        if (result.success) {
                            console.log('Modal form data saved to Google Sheets');
                        } else {
                            console.error('Failed to save modal data:', result.error);
                        }
                    } else {
                        console.warn('Google Sheets integration not available');
                    }
                } catch (error) {
                    console.error('Error sending modal data:', error);
                } finally {
                    if(submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Submit Application';
                    }
                }
                
                modalForm.reset();
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
                showThankYouModal();
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
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const packageType = this.getAttribute('data-package');
                const formElement = document.getElementById(`form-${packageType}`);
                const ctaElement = this.parentElement;
                
                if (formElement && ctaElement) {
                    if (formElement.style.display === 'none' || formElement.style.display === '') {
                        formElement.style.display = 'block';
                        ctaElement.style.display = 'none';
                    } else {
                        formElement.style.display = 'none';
                        ctaElement.style.display = 'block';
                    }
                }
            });
        });

        // Handle package form submissions
        const packageForms = document.querySelectorAll('.package-application-form');
        packageForms.forEach(form => {
            const newForm = form.cloneNode(true);
            form.parentNode.replaceChild(newForm, form);

            newForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(newForm);
                const data = Object.fromEntries(formData);
                const packageType = newForm.getAttribute('data-package');
                
                const requiredFields = ['company', 'contact-person', 'email', 'phone', 'category'];
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!data[field]) {
                        isValid = false;
                        const input = newForm.querySelector(`[name="${field}"]`);
                        if (input) {
                            input.style.borderColor = '#ff6f00';
                        }
                    }
                });
                
                if (isValid) {
                    const submitButton = newForm.querySelector('.submit-button');
                    if (submitButton) {
                        submitButton.disabled = true;
                        submitButton.textContent = 'Submitting...';
                    }
                    
                    try {
                        if (typeof googleSheetsIntegration !== 'undefined') {
                            const result = await googleSheetsIntegration.sendPackageForm(data, packageType);
                            if (result.success) {
                                console.log('Package form data saved to Google Sheets');
                            } else {
                                console.error('Failed to save package data:', result.error);
                            }
                        } else {
                            console.warn('Google Sheets integration not available');
                        }
                    } catch (error) {
                        console.error('Error sending package data:', error);
                    } finally {
                         if (submitButton) {
                             submitButton.disabled = false;
                             submitButton.textContent = 'Apply for Package';
                         }
                    }
                    
                    newForm.reset();
                    const formElement = document.getElementById(`form-${packageType}`);
                    const ctaElement = document.querySelector(`.package-toggle-form[data-package="${packageType}"]`).parentElement;
                    
                    if (formElement && ctaElement) {
                        formElement.style.display = 'none';
                        ctaElement.style.display = 'block';
                    }
                    showThankYouModal();
                } else {
                    alert('Please fill in all required fields.');
                }
            });
            
            // Remove error styling on input
            const inputs = newForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                });
            });
        });
    }

    initializePackageForms();

    // Handle wall excellence form submission
    if (wallForm) {
        wallForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(wallForm);
            const data = Object.fromEntries(formData);
            
            const requiredFields = ['company', 'contact-person', 'email', 'phone', 'category'];
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
                const submitButton = wallForm.querySelector('.submit-button');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Submitting...';
                }
                
                try {
                    if (typeof googleSheetsIntegration !== 'undefined') {
                        const result = await googleSheetsIntegration.sendPackageForm(data, data.package);
                        if (result.success) {
                            console.log('Wall of Excellence form data saved to Google Sheets');
                        } else {
                            console.error('Failed to save wall form data:', result.error);
                        }
                    } else {
                        console.warn('Google Sheets integration not available');
                    }
                } catch (error) {
                    console.error('Error sending wall form data:', error);
                } finally {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Claim Your Spot';
                    }
                }
                
                wallForm.reset();
                wallExcellenceModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                showThankYouModal();
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

    // Handle booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const requiredFields = ['name', 'email', 'phone'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!data[field]) {
                    isValid = false;
                    const input = bookingForm.querySelector(`[name="${field}"]`);
                    if (input) {
                        input.style.borderColor = '#dc3545';
                    }
                }
            });
            
            if (isValid) {
                const submitButton = bookingForm.querySelector('.submit-button');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Confirming...';
                }
                
                try {
                    // Combine booking details with form data
                    const bookingData = {
                        ...data,
                        date: window.currentBookingDetails?.date || '',
                        time: window.currentBookingDetails?.time || '',
                        bookingType: 'Calendar Booking',
                        additionalInfo: `Venue: Engimech Exhibition, Ahmedabad`
                    };
                    
                    if (typeof googleSheetsIntegration !== 'undefined') {
                        const result = await googleSheetsIntegration.sendCalendarBooking(bookingData);
                        if (result.success) {
                            console.log('Booking form data saved to Google Sheets');
                        } else {
                            console.error('Failed to save booking data:', result.error);
                        }
                    } else {
                        console.warn('Google Sheets integration not available');
                    }
                } catch (error) {
                    console.error('Error sending booking data:', error);
                } finally {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'Confirm Booking';
                    }
                }
                
                // Close booking form and show thank you modal
                closeBookingFormModal();
                showThankYouModal();
            } else {
                alert('Please fill in all required fields (Name, Email, Phone).');
            }
        });
    }

    // Note: View Packages button removed - no longer needed since package choices were removed from forms
});
