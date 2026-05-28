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
    
    article.innerHTML = `
        <div class="blog-image" style="background-image: ${post.gradient}, url('${post.image}'); background-size: cover; background-position: center;"></div>
        <div class="blog-content">
            <span class="blog-date">${post.date}</span>
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <p style="color: var(--text-light); font-size: 0.9rem; margin-top: 1rem;">📍 ${post.location} • ${post.readTime}</p>
            <a href="#" class="read-more">Read Full Story →</a>
        </div>
    `;
    
    return article;
}

// Load posts when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadAndRenderBlogPosts();
});
