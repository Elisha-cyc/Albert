document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabNavItems = document.querySelectorAll('.tabs-nav li');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all tabs and panes
            tabNavItems.forEach(tab => tab.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Close other items if open
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Initialize first accordion item as open
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
    }
    
    // Enroll button click handler
    const enrollBtn = document.querySelector('.btn-enroll');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Here you would typically redirect to checkout or add to cart
            alert('You have been enrolled in this course!');
            
            // Update cart count
            const cartCount = document.getElementById('cart-count');
            let count = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = count + 1;
            
            // Store in localStorage (for demo purposes)
            localStorage.setItem('cartCount', count + 1);
        });
    }
    
    // Mobile menu toggle (shared functionality)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Update cart count on page load
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const count = localStorage.getItem('cartCount') || 0;
            cartCount.textContent = count;
        }
    }
    
    updateCartCount();
});