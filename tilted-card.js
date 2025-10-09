// Tilted Card Functionality
class TiltedCard {
    constructor(element, options = {}) {
        this.element = element;
        this.inner = element.querySelector('.tilted-card-inner');
        this.caption = element.querySelector('.tilted-card-caption');
        this.rotateAmplitude = options.rotateAmplitude || 14;
        this.scaleOnHover = options.scaleOnHover || 1.1;
        
        this.rotateX = 0;
        this.rotateY = 0;
        this.scale = 1;
        this.captionX = 0;
        this.captionY = 0;
        this.captionRotate = 0;
        this.lastY = 0;
        
        // Smooth animation values
        this.targetRotateX = 0;
        this.targetRotateY = 0;
        this.targetScale = 1;
        this.targetCaptionRotate = 0;
        
        this.init();
    }
    
    init() {
        this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
        // Start animation loop
        this.animate();
    }
    
    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        
        this.targetRotateX = (offsetY / (rect.height / 2)) * -this.rotateAmplitude;
        this.targetRotateY = (offsetX / (rect.width / 2)) * this.rotateAmplitude;
        
        // Caption position
        this.captionX = e.clientX - rect.left;
        this.captionY = e.clientY - rect.top;
        
        // Caption rotation based on movement
        const velocityY = offsetY - this.lastY;
        this.targetCaptionRotate = -velocityY * 0.3;
        this.lastY = offsetY;
        
        if (this.caption) {
            this.caption.style.left = `${this.captionX}px`;
            this.caption.style.top = `${this.captionY}px`;
        }
    }
    
    handleMouseEnter() {
        this.targetScale = this.scaleOnHover;
    }
    
    handleMouseLeave() {
        this.targetRotateX = 0;
        this.targetRotateY = 0;
        this.targetScale = 1;
        this.targetCaptionRotate = 0;
        this.lastY = 0;
    }
    
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    animate() {
        // Smooth interpolation
        const smoothFactor = 0.15;
        
        this.rotateX = this.lerp(this.rotateX, this.targetRotateX, smoothFactor);
        this.rotateY = this.lerp(this.rotateY, this.targetRotateY, smoothFactor);
        this.scale = this.lerp(this.scale, this.targetScale, smoothFactor);
        this.captionRotate = this.lerp(this.captionRotate, this.targetCaptionRotate, smoothFactor);
        
        // Apply transforms
        if (this.inner) {
            this.inner.style.transform = `
                perspective(1000px)
                rotateX(${this.rotateX}deg)
                rotateY(${this.rotateY}deg)
                scale(${this.scale})
            `;
        }
        
        if (this.caption) {
            this.caption.style.transform = `rotate(${this.captionRotate}deg)`;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize tilted cards when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.tilted-card-figure');
    cards.forEach(card => {
        new TiltedCard(card, {
            rotateAmplitude: 12,
            scaleOnHover: 1.15
        });
    });
});


