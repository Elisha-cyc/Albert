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
    
    // Quantity Selector Functionality
    document.querySelectorAll('.quantity-selector').forEach(selector => {
        const minusBtn = selector.querySelector('.quantity-minus');
        const plusBtn = selector.querySelector('.quantity-plus');
        const input = selector.querySelector('input');
        
        minusBtn.addEventListener('click', function() {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                updateCartItem(this.closest('.cart-item'));
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(input.value);
            if (value < 10) {
                input.value = value + 1;
                updateCartItem(this.closest('.cart-item'));
            }
        });
        
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value = 0) ){
                this.value = 1;
            } else if (value < 1) {
                this.value = 1;
            } else if (value > 10) {
                this.value = 10;
            }
            updateCartItem(this.closest('.cart-item'));
        });
    });
    
    // Remove Item Functionality
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.style.animation = 'fadeOut 0.5s ease-out forwards';
            
            setTimeout(() => {
                cartItem.remove();
                updateCartTotal();
                checkEmptyCart();
            }, 500);
        });
    });
    
    // Update Cart Button
    document.getElementById('update-cart').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-check"></i> Cart Updated';
        this.classList.add('btn-success');
        
        setTimeout(() => {
            this.innerHTML = 'Update Cart';
            this.classList.remove('btn-success');
        }, 2000);
    });
    
    // Proceed to Checkout Button
    document.getElementById('proceed-checkout').addEventListener('click', function() {
        // In a real app, this would redirect to checkout
        alert('Proceeding to checkout!');
    });
    
    // Continue Shopping Button
    document.querySelector('.cart-actions .btn-outline').addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, this would redirect to products page
        window.location.href = 'products.html';
    });
    
    // Coupon Code Application
    document.querySelector('.coupon-code button').addEventListener('click', function() {
        const couponInput = document.querySelector('.coupon-code input');
        const couponCode = couponInput.value.trim();
        
        if (couponCode === '') {
            alert('Please enter a coupon code');
            return;
        }
        
        // In a real app, you would validate the coupon with a server
        if (couponCode.toUpperCase() === 'DISCOUNT10') {
            alert('Coupon applied! 10% discount added.');
            this.innerHTML = 'Applied!';
            this.classList.add('btn-success');
            couponInput.disabled = true;
        } else {
            alert('Invalid coupon code');
        }
    });
    
    // Load Recommended Products
    loadRecommendedProducts();
    
    // Functions
    function updateCartItem(cartItem) {
        const price = parseFloat(cartItem.querySelector('.item-price').textContent.replace('Gh', ''));
        const quantity = parseInt(cartItem.querySelector('input').value);
        const subtotal = cartItem.querySelector('.item-subtotal');
        
        subtotal.textContent = 'Gh' + (price * quantity).toFixed(2);
        updateCartTotal();
    }
    
    function updateCartTotal() {
        const subtotals = document.querySelectorAll('.item-subtotal');
        let total = 0;
        
        subtotals.forEach(subtotal => {
            total += parseFloat(subtotal.textContent.replace('Gh', ''));
        });
        
        const tax = total * 0.075; // 7.5% tax
        const grandTotal = total + tax;
        
        document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = 'Gh' + total.toFixed(2);
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = 'Gh' + tax.toFixed(2);
        document.querySelector('.summary-row.total span:last-child').textContent = 'Gh' + grandTotal.toFixed(2);
    }
    
    function checkEmptyCart() {
        const cartItems = document.querySelectorAll('.cart-item');
        if (cartItems.length === 0) {
            // In a real app, you would show an empty cart state
            alert('Your cart is empty!');
        }
    }
    
    function loadRecommendedProducts() {
        // In a real app, you would fetch these from a server
        const recommendedProducts = [
            {
                id: 5,
                name: 'Digital Clamp Meter',
                price: 89.99,
                image: 'images/products/clamp-meter.jpg',
                category: 'tools'
            },
            {
                id: 6,
                name: 'Insulated Screwdriver Set',
                price: 29.99,
                image: 'images/products/screwdriver-set.jpg',
                category: 'tools'
            },
            {
                id: 7,
                name: 'LED Work Light',
                price: 39.99,
                image: 'images/products/work-light.jpg',
                category: 'lighting'
            },
            {
                id: 8,
                name: 'Safety Gloves',
                price: 14.99,
                image: 'images/products/safety-gloves.jpg',
                category: 'safety'
            }
        ];
        
        const productsGrid = document.querySelector('.products-grid');
        
        if (productsGrid) {
            productsGrid.innerHTML = recommendedProducts.map(product => `
                <div class="product-card" data-category="${product.category}">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h4>${product.name}</h4>
                        <p class="product-price">Gh${product.price.toFixed(2)}</p>
                        <div class="product-actions">
                            <button class="btn btn-small btn-outline">View</button>
                            <button class="btn btn-small btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Add to cart functionality for recommended products
            document.querySelectorAll('.products-grid .btn-primary').forEach(button => {
                button.addEventListener('click', function() {
                    const productCard = this.closest('.product-card');
                    const productName = productCard.querySelector('h4').textContent;
                    
                    // In a real app, you would add to cart
                    alert(`${productName} added to cart!`);
                    
                    // Animation for add to cart button
                    this.innerHTML = '<i class="fas fa-check"></i> Added';
                    this.classList.add('btn-success');
                    
                    setTimeout(() => {
                        this.innerHTML = 'Add to Cart';
                        this.classList.remove('btn-success');
                    }, 2000);
                });
            });
        }
    }
    
    // Add fadeOut animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateX(50px);
            }
        }
    `;
    document.head.appendChild(style);
});