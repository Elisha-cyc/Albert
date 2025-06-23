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
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.mission-card, .team-member, .timeline-item, .partners-grid');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.animation = 'fadeInUp 1s ease-out forwards';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Highlight current year in timeline
    const currentYear = new Date().getFullYear();
    const timelineYears = document.querySelectorAll('.timeline-year');
    
    timelineYears.forEach(year => {
        if (parseInt(year.textContent) === currentYear) {
            year.style.backgroundColor = 'var(--accent-color)';
            year.style.transform = 'translateX(-50%) scale(1.1)';
            year.style.boxShadow = '0 0 0 5px rgba(255, 193, 7, 0.3)';
        }
    });
    
    // Add hover effect to team members
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.05)';
            img.style.borderColor = 'var(--accent-color)';
        });
        
        member.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1)';
            img.style.borderColor = 'var(--primary-color)';
        });
    });
    
    // Add pulse animation to mission cards on hover
    const missionCards = document.querySelectorAll('.mission-card');
    
    missionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s ease-in-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
});