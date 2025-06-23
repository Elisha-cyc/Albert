document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Thumbnail image click handler
    document.querySelectorAll('.thumbnail-images img').forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update active thumbnail
            document.querySelector('.thumbnail-images img.active').classList.remove('active');
            this.classList.add('active');
            
            // Update main image
            const mainImage = document.getElementById('main-product-image');
            const newSrc = this.src.replace('-thumb', '-large');
            mainImage.style.opacity = 0;
            
            setTimeout(() => {
                mainImage.src = newSrc;
                mainImage.style.opacity = 1;
            }, 200);
        });
    });
    
    // Quantity selector functionality
    const minusBtn = document.querySelector('.quantity-minus');
    const plusBtn = document.querySelector('.quantity-plus');
    const quantityInput = document.getElementById('product-quantity');
    
    minusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value < 10) {
            quantityInput.value = value + 1;
        }
    });
    
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        if (isNaN(value)) {
            this.value = 1;
        } else if (value < 1) {
            this.value = 1;
        } else if (value > 10) {
            this.value = 10;
        }
    });
    
    // Tab switching functionality
    const tabNavItems = document.querySelectorAll('.tabs-nav li');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab nav
            document.querySelector('.tabs-nav li.active').classList.remove('active');
            this.classList.add('active');
            
            // Update active tab pane
            document.querySelector('.tab-pane.active').classList.remove('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Add to cart functionality
    document.getElementById('add-to-cart').addEventListener('click', function() {
        const productName = document.getElementById('product-title').textContent;
        const quantity = parseInt(quantityInput.value);
        
        // In a real app, you would add to cart
        alert(`${quantity} ${productName}(s) added to cart!`);
        
        // Update cart count
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = parseInt(cartCount.textContent) + quantity;
        
        // Button animation
        this.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
        this.classList.add('btn-success');
        
        setTimeout(() => {
            this.innerHTML = 'Add to Cart';
            this.classList.remove('btn-success');
        }, 2000);
    });
    
    // Review form submission
    document.getElementById('review-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real app, you would submit to server
        alert('Thank you for your review!');
        this.reset();
    });
    
    // Load related products
    loadRelatedProducts();
    
    function loadRelatedProducts() {
        // In a real app, you would fetch these from a server
        const relatedProducts = [
            {
                id: 2,
                name: 'Digital Multimeter',
                price: 59.99,
                image: 'images/products/multimeter.jpg',
                category: 'tools'
            },
            {
                id: 3,
                name: 'Insulated Screwdriver Set',
                price: 29.99,
                image: 'images/products/screwdriver-set.jpg',
                category: 'tools'
            },
            {
                id: 4,
                name: 'Circuit Breaker Finder',
                price: 49.99,
                image: 'images/products/breaker-finder.jpg',
                category: 'tools'
            },
            {
                id: 5,
                name: 'Electrical Tester Kit',
                price: 79.99,
                image: 'images/products/tester-kit.jpg',
                category: 'tools'
            }
        ];
        
        const productsGrid = document.querySelector('.related-products .products-grid');
        
        if (productsGrid) {
            productsGrid.innerHTML = relatedProducts.map(product => `
                <div class="product-card" data-category="${product.category}">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h4>${product.name}</h4>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-actions">
                            <button class="btn btn-small btn-outline">View Details</button>
                            <button class="btn btn-small btn-primary add-to-cart" data-id="${product.id}">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Add click handlers for related products
            document.querySelectorAll('.related-products .add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.dataset.id);
                    const product = relatedProducts.find(p => p.id === productId);
                    
                    // In a real app, you would add to cart
                    alert(`${product.name} added to cart!`);
                    
                    // Update cart count
                    const cartCount = document.getElementById('cart-count');
                    cartCount.textContent = parseInt(cartCount.textContent) + 1;
                    
                    // Button animation
                    this.innerHTML = '<i class="fas fa-check"></i> Added';
                    this.classList.add('btn-success');
                    
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                        this.classList.remove('btn-success');
                    }, 2000);
                });
            });
        }
    }
    
    // Animate rating bars on tab show
    document.querySelector('[data-tab="reviews"]').addEventListener('click', function() {
        setTimeout(() => {
            document.querySelectorAll('.fill').forEach(fill => {
                // This triggers the CSS transition
                fill.style.width = fill.style.width;
            });
        }, 300);
    });
});