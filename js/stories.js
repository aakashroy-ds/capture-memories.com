// stories rendering functionality
let allPosts = [];

async function loadAndRenderStoriesPosts() {
    try {
        const response = await fetch('../data/posts.json');
        if (!response.ok) throw new Error('Failed to load posts');

        allPosts = await response.json();

        const activeCountry = getCountryParam();
        buildFilterBar(allPosts, activeCountry);
        renderFilteredPosts(activeCountry);
    } catch (error) {
        console.error('Error loading stories posts:', error);
    }
}

// Read the ?country= query param from the URL
function getCountryParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get('country') || null;
}

// Build the country filter chip bar above the stories grid
function buildFilterBar(posts, activeCountry) {
    const section = document.querySelector('.stories-grid').closest('section');

    // Build unique country list from posts
    const countries = [];
    const seen = new Set();
    posts.forEach(p => {
        if (!seen.has(p.country)) {
            seen.add(p.country);
            countries.push({ slug: p.country, label: p.countryLabel });
        }
    });

    // Country filter bar wrapper
    const filterBar = document.createElement('div');
    filterBar.className = 'stories-filter-bar';

    // "All Stories" chip
    const allChip = document.createElement('button');
    allChip.className = 'filter-chip' + (!activeCountry ? ' active' : '');
    allChip.textContent = 'All Stories';
    allChip.addEventListener('click', () => applyFilter(null));
    filterBar.appendChild(allChip);

    // Per-country chips
    countries.forEach(({ slug, label }) => {
        const chip = document.createElement('button');
        chip.className = 'filter-chip' + (activeCountry === slug ? ' active' : '');
        chip.textContent = label;
        chip.addEventListener('click', () => applyFilter(slug));
        filterBar.appendChild(chip);
    });

    // Insert filter bar before the stories grid section's container
    section.insertBefore(filterBar, section.firstChild);

    // Filtered view banner (shown only when a country is selected)
    if (activeCountry) {
        const countryLabel = countries.find(c => c.slug === activeCountry)?.label || activeCountry;
        const banner = document.createElement('div');
        banner.className = 'stories-filter-banner';
        banner.id = 'filter-banner';
        banner.innerHTML = `
            <span>📍 Showing travel stories from <strong>${countryLabel}</strong></span>
            <a href="stories.html" class="filter-banner-clear">View All Stories ×</a>
        `;
        section.insertBefore(banner, filterBar.nextSibling);
    }
}

// Re-render posts when a filter chip is clicked (client-side, no page reload)
function applyFilter(country) {
    // Update URL without reloading
    const url = country ? `?country=${country}` : window.location.pathname;
    history.pushState({}, '', url);

    // Update active chip state
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.toggle('active', chip.textContent === (country
            ? allPosts.find(p => p.country === country)?.countryLabel
            : 'All Stories'));
    });

    // Show/hide banner
    const existingBanner = document.getElementById('filter-banner');
    if (existingBanner) existingBanner.remove();

    if (country) {
        const countryLabel = allPosts.find(p => p.country === country)?.countryLabel || country;
        const section = document.querySelector('.stories-grid').closest('section');
        const filterBar = document.querySelector('.stories-filter-bar');
        const banner = document.createElement('div');
        banner.className = 'stories-filter-banner';
        banner.id = 'filter-banner';
        banner.innerHTML = `
            <span>📍 Showing travel stories from <strong>${countryLabel}</strong></span>
            <a href="stories.html" class="filter-banner-clear">View All Stories ×</a>
        `;
        filterBar.insertAdjacentElement('afterend', banner);
    }

    renderFilteredPosts(country);
}

// Render only the posts matching the active country (or all if null)
function renderFilteredPosts(activeCountry) {
    const storiesGrid = document.querySelector('.stories-grid');
    if (!storiesGrid) return;

    const filtered = activeCountry
        ? allPosts.filter(p => p.country === activeCountry)
        : allPosts;

    storiesGrid.innerHTML = '';

    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'stories-empty-state';
        empty.innerHTML = `
            <p>No stories yet for this destination.</p>
            <p>Check back soon — adventures are being documented! ✈️</p>
            <a href="stories.html" class="read-more" style="margin-top:1rem;display:inline-block;">View All Stories →</a>
        `;
        storiesGrid.appendChild(empty);
        return;
    }

    filtered.forEach(post => {
        storiesGrid.appendChild(createPostCard(post));
    });

    if (typeof staggerAnimation === 'function') {
        staggerAnimation('.stories-card', 0.15);
    }

    if (typeof initializeScrollAnimations === 'function') {
        initializeScrollAnimations();
    }
}

// Create a stories card element
function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'stories-card';
    article.setAttribute('data-aos', 'fade-up');

    // Image container with background styling
    const imageDiv = document.createElement('div');
    imageDiv.className = 'stories-image';
    imageDiv.style.backgroundImage = `${post.gradient}, url('${post.image}')`;
    imageDiv.style.backgroundSize = 'cover';
    imageDiv.style.backgroundPosition = 'center';

    // Content container
    const contentDiv = document.createElement('div');
    contentDiv.className = 'stories-content';

    // Date span
    const dateSpan = document.createElement('span');
    dateSpan.className = 'stories-date';
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
    readMoreLink.href = `${post.slug}.html`;
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
    loadAndRenderStoriesPosts();
});
