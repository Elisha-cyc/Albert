document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Professional Voltage Tester',
            price: 49.99,
            category: 'tools',
            rating: 4.5,
            image: 'tester.jpeg',
            description: 'High-quality voltage tester with LED indicators'
        },
        {
            id: 2,
            name: 'Heavy Duty Wire Stripper',
            price: 24.99,
            category: 'tools',
            rating: 4.2,
            image: 'heavy.jpeg',
            description: '8-inch wire stripper with comfortable grip'
        },
        {
            id: 3,
            name: 'LED Panel Light 40W',
            price: 39.99,
            category: 'lighting',
            rating: 4.7,
            image: 'images/product/led.jpeg',
            description: 'Energy efficient 40W LED panel light'
        },
        {
            id: 4,
            name: '12/2 Electrical Wire',
            price: 0.89,
            category: 'wiring',
            rating: 4.0,
            image: 'electrical-wire.jpeg',
            description: '12 gauge 2 conductor with ground NM-B wire'
        },
        {
            id: 5,
            name: 'Insulated Safety Gloves',
            price: 29.99,
            category: 'safety',
            rating: 4.8,
            image: 'glooves.jpeg',
            description: 'Class 00 insulated rubber gloves'
        },
        {
            id: 6,
            name: 'Decora Light Switch',
            price: 4.99,
            category: 'switches',
            rating: 4.3,
            image: 'daco.jpeg',
            description: 'Modern decorator-style light switch'
        },
        {
            id: 7,
            name: 'Digital Multimeter',
            price: 59.99,
            category: 'tools',
            rating: 4.9,
            image: 'mult.jpeg',
            description: 'Professional digital multimeter with auto-ranging'
        },
        {
            id: 8,
            name: 'GFCI Outlet',
            price: 14.99,
            category: 'switches',
            rating: 4.6,
            image: 'switch.jpeg',
            description: '15 Amp 125V tamper resistant GFCI receptacle'
        }
    ];

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    // Filter products by category if specified
    let filteredProducts = products;
    if (category) {
        filteredProducts = products.filter(product => product.category === category);
        
        // Update active category link
        document.querySelectorAll('.filter-categories a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(category)) {
                link.classList.add('active');
            }
        });
    }

    // Render products
    renderProducts(filteredProducts);
    
    // Sort functionality
    document.getElementById('sort').addEventListener('change', function() {
        const sortValue = this.value;
        let sortedProducts = [...filteredProducts];
        
        switch(sortValue) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'rating':
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Default sorting (by ID or original order)
                sortedProducts = [...filteredProducts];
        }
        
        renderProducts(sortedProducts);
    });
    
    // Search functionality
    document.getElementById('product-search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const searchedProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
        renderProducts(searchedProducts);
    });
    
    // Add to cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            
            // In a real app, you would add to cart
            alert(`${product.name} added to cart!`);
            
            // Update cart count
            const cartCount = document.getElementById('cart-count');
            cartCount.textContent = parseInt(cartCount.textContent) + 1;
            
            // Button animation
            e.target.innerHTML = '<i class="fas fa-check"></i> Added';
            e.target.classList.add('btn-success');
            
            setTimeout(() => {
                e.target.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                e.target.classList.remove('btn-success');
            }, 2000);
        }
    });
    
    // Function to render products
    function renderProducts(productsToRender) {
        const productsGrid = document.getElementById('products-grid');
        
        if (productsToRender.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-box-open"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                    <a href="products.html" class="btn btn-primary">View All Products</a>
                </div>
            `;
            return;
        }
        
        productsGrid.innerHTML = productsToRender.map(product => `
            <div class="product-card" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">Gh${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        ${renderRatingStars(product.rating)}
                        <span>(${product.rating})</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-small btn-outline">View Details</button>
                        <button class="btn btn-small btn-primary add-to-cart" data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Function to render rating stars
    function renderRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }
    
    // Brand slider animation
    const brandSlider = document.querySelector('.brands-slider');
    if (brandSlider) {
        let scrollAmount = 0;
        const scrollStep = 200;
        const scrollInterval = setInterval(() => {
            brandSlider.scrollLeft += scrollStep;
            scrollAmount += scrollStep;
            
            if (scrollAmount >= brandSlider.scrollWidth - brandSlider.clientWidth) {
                scrollAmount = 0;
                brandSlider.scrollLeft = 0;
            }
        }, 3000);
        
        // Pause on hover
        brandSlider.addEventListener('mouseenter', () => {
            clearInterval(scrollInterval);
        });
        
        brandSlider.addEventListener('mouseleave', () => {
            scrollInterval = setInterval(() => {
                brandSlider.scrollLeft += scrollStep;
                scrollAmount += scrollStep;
                
                if (scrollAmount >= brandSlider.scrollWidth - brandSlider.clientWidth) {
                    scrollAmount = 0;
                    brandSlider.scrollLeft = 0;
                }
            }, 3000);
        });
    }
});