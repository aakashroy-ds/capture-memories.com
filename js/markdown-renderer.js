// Markdown renderer utility - uses marked.js library
async function loadAndRenderMarkdown(filePath, containerId) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Failed to load markdown');

        const markdown = await response.text();
        const container = document.getElementById(containerId);

        if (!container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        // Use marked library (loaded from CDN) to convert markdown to HTML
        if (typeof marked === 'undefined') {
            console.error('marked.js library not loaded');
            return;
        }

        // Configure marked options
        marked.setOptions({
            breaks: true,
            gfm: true,
        });

        // Custom renderer to handle YouTube embeds and images
        const renderer = new marked.Renderer();

        // Handle YouTube embeds: [youtube: VIDEO_ID]
        const originalParagraph = renderer.paragraph.bind(renderer);
        renderer.paragraph = function(token) {
            let text = this.parser.parseInline(token.tokens);
            
            // Replace [youtube: VIDEO_ID] with iframe embed
            text = text.replace(/\[youtube:\s*([a-zA-Z0-9_-]+)\]/g, (match, videoId) => {
                return `<div class="youtube-embed"><iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
            });

            return `<p>${text}</p>`;
        };

        // Handle images with responsive wrapper
        renderer.image = function(token) {
            return `<figure class="stories-figure"><img src="${token.href}" alt="${token.text}" loading="lazy"><figcaption>${token.text}</figcaption></figure>`;
        };

        marked.setOptions({ renderer });

        const html = marked.parse(markdown);
        container.innerHTML = html;

        // Re-initialize scroll animations for newly rendered content
        if (typeof initializeScrollAnimations === 'function') {
            initializeScrollAnimations();
        }
    } catch (error) {
        console.error('Error loading or rendering markdown:', error);
    }
}
