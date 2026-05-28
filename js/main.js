// Global settings
const settings = {
    animationDuration: 0.8,
    scrollThreshold: 0.1,
};

// Update footer copyright year dynamically
function updateFooterYear() {
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.textContent = `\u00a9 ${currentYear} Capture Memories. All rights reserved.`;
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    updateFooterYear();
    initializeScrollAnimations();
    initializeNewsletterForm();
    handleSmoothScrolling();
});

// Scroll animations
function initializeScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: settings.scrollThreshold,
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Newsletter form
function initializeNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Simple validation
        if (email && isValidEmail(email)) {
            showNotification('Thank you for subscribing!', 'success');
            form.reset();
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
}

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 2rem;
        border-radius: 8px;
        background: ${type === 'success' ? '#34c759' : '#ff3b30'};
        color: white;
        font-weight: 600;
        z-index: 2000;
        animation: slideInUp 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInDown 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scrolling
function handleSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Scroll position indicator
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    if (scrolled > 50) {
        navbar?.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        navbar?.style.boxShadow = 'none';
    }
});
