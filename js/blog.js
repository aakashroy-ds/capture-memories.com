// Blog rendering functionality
async function loadAndRenderBlogPosts() {
    try {
        const response = await fetch('../data/posts.json');
        if (!response.ok) throw new Error('Failed to load posts');
        
        const posts = await response.json();
        const blogGrid = document.querySelector('.blog-grid');
        
        if (!blogGrid) return;
        
        // Clear existing hardcoded posts
        blogGrid.innerHTML = '';
        
        // Render each post
        posts.forEach(post => {
            const postElement = createPostCard(post);
            blogGrid.appendChild(postElement);
        });
        
        // Apply stagger animation to dynamically rendered blog cards
        staggerAnimation('.blog-card', 0.15);
        
        // Reinitialize animations for newly added elements
        if (typeof initializeScrollAnimations === 'function') {
            initializeScrollAnimations();
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Create a blog card element
function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    article.setAttribute('data-aos', 'fade-up');
    
    // Image container with background styling
    const imageDiv = document.createElement('div');
    imageDiv.className = 'blog-image';
    imageDiv.style.backgroundImage = `${post.gradient}, url('${post.image}')`;
    imageDiv.style.backgroundSize = 'cover';
    imageDiv.style.backgroundPosition = 'center';
    
    // Content container
    const contentDiv = document.createElement('div');
    contentDiv.className = 'blog-content';
    
    // Date span
    const dateSpan = document.createElement('span');
    dateSpan.className = 'blog-date';
    dateSpan.textContent = post.date;
    contentDiv.appendChild(dateSpan);
    
    // Title heading
    const titleH3 = document.createElement('h3');
    titleH3.textContent = post.title;
    contentDiv.appendChild(titleH3);
    
    // Description paragraph
    const descP = document.createElement('p');
    descP.textContent = post.description;
    contentDiv.appendChild(descP);
    
    // Location and read time info
    const infoP = document.createElement('p');
    infoP.style.color = 'var(--text-light)';
    infoP.style.fontSize = '0.9rem';
    infoP.style.marginTop = '1rem';
    infoP.textContent = `📍 ${post.location} • ${post.readTime}`;
    contentDiv.appendChild(infoP);
    
    // Read more link
    const readMoreLink = document.createElement('a');
    readMoreLink.href = '#';
    readMoreLink.className = 'read-more';
    readMoreLink.textContent = 'Read Full Story →';
    contentDiv.appendChild(readMoreLink);
    
    // Assemble the card
    article.appendChild(imageDiv);
    article.appendChild(contentDiv);
    
    return article;
}

// Load posts when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadAndRenderBlogPosts();
});
