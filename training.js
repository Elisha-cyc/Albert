document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Course filtering functionality
    const categoryLinks = document.querySelectorAll('.filter-categories a');
    const courseCards = document.querySelectorAll('.course-card');
    const sortSelect = document.getElementById('sort');
    const searchInput = document.getElementById('course-search');
    
    // Filter by category
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('href').split('=')[1] || 'all';
            
            // Filter courses
            courseCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategory = card.querySelector('.course-level').classList[1];
                    if (cardCategory === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Sort courses
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const container = document.querySelector('.courses-grid');
        const cards = Array.from(document.querySelectorAll('.course-card'));
        
        cards.sort((a, b) => {
            switch(sortValue) {
                case 'price-low':
                    const priceA = parseFloat(a.querySelector('.current-price').textContent.replace(/[^0-9.]/g, ''));
                    const priceB = parseFloat(b.querySelector('.current-price').textContent.replace(/[^0-9.]/g, ''));
                    return priceA - priceB;
                
                case 'price-high':
                    const priceAHigh = parseFloat(a.querySelector('.current-price').textContent.replace(/[^0-9.]/g, ''));
                    const priceBHigh = parseFloat(b.querySelector('.current-price').textContent.replace(/[^0-9.]/g, ''));
                    return priceBHigh - priceAHigh;
                
                case 'duration':
                    const durationA = parseInt(a.querySelector('.course-meta span:first-child').textContent);
                    const durationB = parseInt(b.querySelector('.course-meta span:first-child').textContent);
                    return durationA - durationB;
                
                case 'date':
                    // This would need actual date data in the cards to work properly
                    return 0;
                
                default:
                    return 0;
            }
        });
        
        // Re-append sorted cards
        cards.forEach(card => container.appendChild(card));
    });
    
    // Search courses
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        courseCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Update cart count (this would normally come from your cart system)
    function updateCartCount() {
        // This is a placeholder - in a real app, you'd get this from your cart system
        const cartCount = localStorage.getItem('cartCount') || 0;
        document.getElementById('cart-count').textContent = cartCount;
    }
    
    updateCartCount();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle URL parameters for initial filtering
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
        const categoryLink = document.querySelector(`.filter-categories a[href*="${categoryParam}"]`);
        if (categoryLink) {
            categoryLink.click();
        }
    }
});