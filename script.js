// Toggle mobile menu
const hamburger = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.nav');

if (hamburger && nav) { // Ensure elements exist before adding listeners
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
} else {
    console.error("Hamburger menu or navigation element not found.");
}

// Close menu on link click (for mobile)
const navLinks = document.querySelectorAll('.nav a');
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only remove 'active' class if nav is currently active (i.e., on mobile)
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
} else {
    console.warn("No navigation links found.");
}

// Highlight the current nav link
document.addEventListener('DOMContentLoaded', () => {
    // Get the full absolute URL of the current page
    let currentFullUrl = window.location.href;

    // Remove any hash fragments (e.g., #section) for accurate comparison
    const hashIndex = currentFullUrl.indexOf('#');
    if (hashIndex > -1) {
        currentFullUrl = currentFullUrl.substring(0, hashIndex);
    }

    // Remove any query parameters (e.g., ?param=value) for accurate comparison
    const queryIndex = currentFullUrl.indexOf('?');
    if (queryIndex > -1) {
        currentFullUrl = currentFullUrl.substring(0, queryIndex);
    }

    // Ensure currentFullUrl ends with a slash if it's the root directory (e.g., http://localhost:8000)
    // This makes sure it can be compared to 'http://localhost:8000/index.html' which is common.
    if (!currentFullUrl.endsWith('/') && !currentFullUrl.match(/\.[a-zA-Z0-9]+$/)) {
        currentFullUrl += '/';
    }

    const navItems = document.querySelectorAll('.nav-link');

    console.log("Current page's processed URL:", currentFullUrl); // Debug: check output

    navItems.forEach(link => {
        // Get the full absolute URL of the navigation link
        let linkFullUrl = link.href;

        // Normalize linkFullUrl: remove hash and query parameters too
        const linkHashIndex = linkFullUrl.indexOf('#');
        if (linkHashIndex > -1) {
            linkFullUrl = linkFullUrl.substring(0, linkHashIndex);
        }
        const linkQueryIndex = linkFullUrl.indexOf('?');
        if (linkQueryIndex > -1) {
            linkFullUrl = linkFullUrl.substring(0, linkQueryIndex);
        }

        // Handle the case where a link points to 'index.html' and the current URL is just the root '/'
        // For example: current is 'http://localhost:8000/' and link is 'http://localhost:8000/index.html'
        // Or if the link is 'http://localhost:8000' (no index.html) and current is 'http://localhost:8000/index.html'
        let normalizedCurrentUrl = currentFullUrl;
        let normalizedLinkUrl = linkFullUrl;

        // If the link resolves to the root without index.html, and current is index.html, normalize
        if (normalizedLinkUrl.endsWith('/') && normalizedCurrentUrl.endsWith('index.html')) {
            normalizedLinkUrl += 'index.html';
        } else if (normalizedCurrentUrl.endsWith('/') && normalizedLinkUrl.endsWith('index.html')) {
            // Do nothing, current is root, link is index.html. We will compare normalizedCurrentUrl with 'link.href'
            // and the previous logic for currentFullUrl will add index.html to it.
        } else if (normalizedLinkUrl.endsWith('index.html') && normalizedCurrentUrl.endsWith('/')) {
            normalizedCurrentUrl += 'index.html';
        }


        // Final check for matching URLs (case-insensitive for robustness)
        if (normalizedLinkUrl.toLowerCase() === normalizedCurrentUrl.toLowerCase()) {
            link.classList.add('active');
            console.log("Match found for:", linkFullUrl); // Debug
        }
    });
});
