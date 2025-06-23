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
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
    }
    
    function nextTestimonial() {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
        }
        showTestimonial(currentTestimonial);
    }
    
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(nextTestimonial, 5000);
    
    // Pause on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    testimonialSlider.addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        // In a real app, you would send this to your server
        console.log('Subscribed email:', emailInput.value);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    });
    
    // Cart Count (would be dynamic in a real app)
    // This is just for demonstration
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = '0';
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-box, .category-card, .product-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});