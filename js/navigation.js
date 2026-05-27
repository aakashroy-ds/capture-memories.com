// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu?.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
        }
    });

    // Set active link based on current page
    updateActiveLink();
});

function updateActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
