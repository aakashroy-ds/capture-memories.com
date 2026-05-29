(function () {
    var inPagesDir = /\/pages\//.test(window.location.pathname);
    var prefix = inPagesDir ? '../' : '';

    var html = '' +
        '<div class="container">' +
            '<div class="footer-content">' +
                '<div class="footer-section">' +
                    '<h4>Capture Memories</h4>' +
                    '<p>Your journey into the world’s most beautiful destinations.</p>' +
                '</div>' +
                '<div class="footer-section">' +
                    '<h4>Quick Links</h4>' +
                    '<ul>' +
                        '<li><a href="' + prefix + 'index.html">Home</a></li>' +
                        '<li><a href="' + prefix + 'pages/destinations.html">Destinations</a></li>' +
                        '<li><a href="' + prefix + 'pages/stories.html">stories</a></li>' +
                        '<li><a href="' + prefix + 'pages/gallery.html">Gallery</a></li>' +
                        '<li><a href="' + prefix + 'pages/about.html">About</a></li>' +
                        '<li><a href="' + prefix + 'pages/contact.html">Contact</a></li>' +
                    '</ul>' +
                '</div>' +
                '<div class="footer-section">' +
                    '<h4>Follow Us</h4>' +
                    '<div class="social-links">' +
                        '<a href="https://www.instagram.com/aakashroy_capture.memories" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>' +
                        '<a href="#" title="Twitter"><i class="fab fa-twitter"></i></a>' +
                        '<a href="https://www.facebook.com/profile.php?id=100063776271467" target="_blank" title="Facebook"><i class="fab fa-facebook"></i></a>' +
                        '<a href="https://www.youtube.com/@capturememories1585" target="_blank" title="YouTube"><i class="fab fa-youtube"></i></a>' +
                        '<a href="#" title="Pinterest"><i class="fab fa-pinterest"></i></a>' +
                    '</div>' +
                '</div>' +
                '<div class="footer-section">' +
                    '<h4>Contact</h4>' +
                    '<p>Email: support@capturememories.com</p>' +
                '</div>' +
            '</div>' +
            '<div class="footer-bottom">' +
                '<p>&copy; ' + new Date().getFullYear() + ' Capture Memories. All rights reserved.</p>' +
            '</div>' +
        '</div>';

    function render() {
        var mount = document.getElementById('site-footer');
        if (!mount) return;
        mount.className = 'footer';
        mount.innerHTML = html;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
