// Simple script to test button functionality
console.log('Simple script loaded');

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

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up modal functionality');
    
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
    
    console.log('Elements found:', {
        modal: !!modal,
        openModalBtn: !!openModalBtn,
        openPackagesBtn: !!openPackagesBtn,
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
                document.body.style.overflow = 'hidden';
                console.log('Modal should be visible now');
            } else {
                console.error('Modal element not found');
            }
        });
    } else {
        console.error('Apply button not found');
    }

    // Handle "View Packages" button to scroll to packages section
    if (openPackagesBtn) {
        openPackagesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('View Packages button clicked, scrolling to packages section');
            const packagesSection = document.querySelector('.participation-packages');
            if (packagesSection) {
                packagesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.error('Packages section not found');
            }
        });
    } else {
        console.error('View Packages button not found');
    }

    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            console.log('Close button clicked');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Simple form submission handler
    const modalForm = document.querySelector('.modal-application-form');
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            // Simple validation
            const requiredFields = ['company', 'contact-person', 'email', 'phone', 'category', 'package'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = modalForm.querySelector(`[name="${field}"]`);
                if (!input || !input.value.trim()) {
                    isValid = false;
                    if (input) {
                        input.style.borderColor = '#dc3545';
                    }
                }
            });
            
            if (isValid) {
                console.log('Form is valid, showing thank you modal');
                modalForm.reset();
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                showThankYouModal();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    console.log('Modal functionality setup complete');
});
