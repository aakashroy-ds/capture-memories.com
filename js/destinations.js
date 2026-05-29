// Destinations rendering functionality
async function loadAndRenderDestinations() {
    try {
        const response = await fetch('../data/destinations.json');
        if (!response.ok) throw new Error('Failed to load destinations');

        const destinations = await response.json();
        const grid = document.querySelector('.destinations-grid');

        if (!grid) return;

        grid.innerHTML = '';

        destinations.forEach(destination => {
            grid.appendChild(createDestinationCard(destination));
        });

        if (typeof staggerAnimation === 'function') {
            staggerAnimation('.destination-card', 0.15);
        }

        if (typeof initializeScrollAnimations === 'function') {
            initializeScrollAnimations();
        }
    } catch (error) {
        console.error('Error loading destinations:', error);
    }
}

// Build a single destination card from data
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.setAttribute('data-aos', 'fade-up');

    // Image / hero area
    const imageDiv = document.createElement('div');
    imageDiv.className = 'destination-image';
    imageDiv.style.backgroundImage = `${destination.gradient}, url('${destination.image}')`;
    imageDiv.style.backgroundSize = 'cover';
    imageDiv.style.backgroundPosition = 'center';

    // Content area
    const contentDiv = document.createElement('div');
    contentDiv.className = 'destination-content';

    const title = document.createElement('h3');
    title.textContent = destination.name;
    contentDiv.appendChild(title);

    const desc = document.createElement('p');
    desc.textContent = destination.description;
    contentDiv.appendChild(desc);

    // Highlights list
    const ul = document.createElement('ul');
    ul.style.cssText = 'margin: 1rem 0; color: var(--text-light); list-style: none;';
    destination.highlights.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
    contentDiv.appendChild(ul);

    // Discover More link — country is a param, not hardcoded
    const link = document.createElement('a');
    link.href = `stories.html?country=${destination.country}`;
    link.className = 'read-more';
    link.textContent = 'Discover More →';
    contentDiv.appendChild(link);

    card.appendChild(imageDiv);
    card.appendChild(contentDiv);

    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    loadAndRenderDestinations();
});
