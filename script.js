// Select DOM elements
const hamburger = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.nav');

// Toggle the visibility of the navigation menu
hamburger.addEventListener('click', () => {
    // Add or remove the 'active' class to the navigation
    nav.classList.toggle('active');
});

// Close the menu when a link is clicked (optional)
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active'); // Close the menu
    });
});
// 2. Placeholder for Future Features
// Add additional interactive features below, e.g.:
// - Form validation
// - Modals
// - Dynamic content loading


