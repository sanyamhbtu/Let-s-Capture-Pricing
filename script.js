// DOM Elements
const pricingCards = document.querySelectorAll('.pricing-card');
const scrollToTopBtn = document.getElementById('scrollToTop');
const heroSection = document.getElementById('hero');

// Initialize animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    initializePricingCards();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactBar();
});

// Pricing Cards Functionality
function initializePricingCards() {
    pricingCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't expand if clicking the select button
            if (e.target.classList.contains('select-plan-btn') || e.target.closest('.select-plan-btn')) {
                handlePlanSelection(card);
                return;
            }
            
            toggleCardExpansion(card);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            addHoverEffect(card);
        });
        
        card.addEventListener('mouseleave', function() {
            removeHoverEffect(card);
        });
    });
}

function toggleCardExpansion(card) {
    const isExpanded = card.classList.contains('expanded');
    
    // Close all other cards
    pricingCards.forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('expanded');
            animateCardCollapse(otherCard);
        }
    });
    
    // Toggle current card
    if (isExpanded) {
        card.classList.remove('expanded');
        animateCardCollapse(card);
    } else {
        card.classList.add('expanded');
        animateCardExpansion(card);
    }
}

function animateCardExpansion(card) {
    const expandedContent = card.querySelector('.expanded-content');
    const features = card.querySelectorAll('.expanded-feature');
    
    // Animate card scale
    card.style.transform = 'translateY(-10px) scale(1.02)';
    
    // Animate expanded content
    setTimeout(() => {
        expandedContent.style.maxHeight = expandedContent.scrollHeight + 'px';
        expandedContent.style.opacity = '1';
        
        // Stagger animation of features
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
            }, 200);
        });
    }, 100);
}

function animateCardCollapse(card) {
    const expandedContent = card.querySelector('.expanded-content');
    
    expandedContent.style.maxHeight = '0px';
    expandedContent.style.opacity = '0';
    
    setTimeout(() => {
        card.style.transform = '';
    }, 300);
}

function addHoverEffect(card) {
    if (!card.classList.contains('expanded')) {
        const icon = card.querySelector('.plan-icon');
        if (icon) {
            icon.style.animation = 'iconFloat 1s ease-in-out infinite';
        }
        
        // Add glow effect
        card.style.boxShadow = '0 25px 50px rgba(244, 208, 63, 0.3)';
    }
}

function removeHoverEffect(card) {
    if (!card.classList.contains('expanded')) {
        const icon = card.querySelector('.plan-icon');
        if (icon) {
            icon.style.animation = 'iconFloat 2s ease-in-out infinite';
        }
    }
}

function handlePlanSelection(card) {
    const planName = card.querySelector('.plan-name').textContent;
    const planPrice = card.querySelector('.amount').textContent;
    
    // Create selection animation
    const button = card.querySelector('.select-plan-btn');
    button.style.transform = 'scale(0.95)';
    button.innerHTML = '<span>Selected! ✓</span>';
    button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        showSelectionModal(planName, planPrice);
        
        // Reset button after delay
        setTimeout(() => {
            button.innerHTML = `<span>Choose ${planName}</span>`;
            button.style.background = 'linear-gradient(135deg, #f4d03f 0%, #d4ac0d 100%)';
        }, 2000);
    }, 200);
}

function showSelectionModal(planName, planPrice) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'selection-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Plan Selected! 🎉</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>You've selected the <strong>${planName}</strong> package for <strong>₹${planPrice}</strong>.</p>
                <p>We'll contact you soon to discuss your requirements!</p>
                <div class="modal-actions">
                    <button class="modal-btn primary" onclick="scrollToSection('contact')">Contact Us</button>
                    <button class="modal-btn secondary" onclick="closeModal()">Continue Browsing</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .selection-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: rgba(26, 31, 54, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(244, 208, 63, 0.3);
            border-radius: 20px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            text-align: center;
            animation: slideIn 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        
        .modal-header h3 {
            color: #f4d03f;
            margin: 0;
        }
        
        .close-modal {
            background: none;
            border: none;
            color: #ffffff;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .close-modal:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .modal-body p {
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .modal-btn {
            flex: 1;
            padding: 0.75rem 1rem;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .modal-btn.primary {
            background: linear-gradient(135deg, #f4d03f, #d4ac0d);
            color: #1a1f36;
        }
        
        .modal-btn.primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(244, 208, 63, 0.4);
        }
        
        .modal-btn.secondary {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .modal-btn.secondary:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to { 
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    
    // Add styles to document
    if (!document.getElementById('modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(modal);
    
    // Close modal handlers
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Make closeModal function global
    window.closeModal = function() {
        modal.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    };
}

// Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', handleScroll);
    
    // Initialize Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.pricing-card, .contact-card, .section-title, .section-subtitle');
    animateElements.forEach(el => observer.observe(el));
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide scroll to top button
    if (scrollTop > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
    
    // Parallax effect for hero section
    if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollRatio = Math.min(scrollTop / heroHeight, 1);
        
        // Apply parallax to background shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrollTop * speed * 0.1}px)`;
        });
        
        // Fade out hero content
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = Math.max(1 - scrollRatio * 1.5, 0);
            heroContent.style.transform = `translateY(${scrollTop * 0.3}px)`;
        }
    }
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for any fixed header
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Add highlight effect to section
        section.style.animation = 'sectionHighlight 2s ease';
        setTimeout(() => {
            section.style.animation = '';
        }, 2000);
    }
}

// Make scrollToSection global
window.scrollToSection = scrollToSection;

// Initialize other animations
function initializeAnimations() {
    // Add staggered animation to pricing cards
    pricingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Animate contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Initialize particle system
    createParticles();
}

function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(244, 208, 63, 0.6);
            border-radius: 50%;
            animation: particleFloat ${15 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
    
    // Add particle animation keyframes
    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(50px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes sectionHighlight {
            0% { background: rgba(244, 208, 63, 0); }
            50% { background: rgba(244, 208, 63, 0.1); }
            100% { background: rgba(244, 208, 63, 0); }
        }
    `;
    
    document.head.appendChild(particleStyles);
}

// Contact bar functionality
function initializeContactBar() {
    const contactBarItems = document.querySelectorAll('.contact-bar-item');
    
    contactBarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = item.getAttribute('href');
            
            if (href && href.startsWith('tel:')) {
                // Add call animation
                const icon = item.querySelector('.contact-bar-icon');
                icon.style.animation = 'contactBarRing 1s ease-in-out 3';
                
                setTimeout(() => {
                    icon.style.animation = 'contactBarPulse 2s ease-in-out infinite';
                }, 3000);
            }
        });
    });
    
    // Add contact bar ring animation
    const contactStyles = document.createElement('style');
    contactStyles.textContent = `
        @keyframes contactBarRing {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.1) rotate(-5deg); }
            75% { transform: scale(1.1) rotate(5deg); }
        }
    `;
    
    document.head.appendChild(contactStyles);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close expanded cards with Escape key
    if (e.key === 'Escape') {
        pricingCards.forEach(card => {
            if (card.classList.contains('expanded')) {
                card.classList.remove('expanded');
                animateCardCollapse(card);
            }
        });
        
        // Close modal if open
        if (window.closeModal) {
            const modal = document.querySelector('.selection-modal');
            if (modal) {
                window.closeModal();
            }
        }
    }
    
    // Scroll to top with Home key
    if (e.key === 'Home' && e.ctrlKey) {
        e.preventDefault();
        scrollToSection('hero');
    }
    
    // Scroll to contact with End key
    if (e.key === 'End' && e.ctrlKey) {
        e.preventDefault();
        scrollToSection('contact');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll handler
window.addEventListener('scroll', throttle(handleScroll, 16)); // ~60fps

// Accessibility improvements
function initializeAccessibility() {
    // Add ARIA labels to interactive elements
    pricingCards.forEach((card, index) => {
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${card.querySelector('.plan-name').textContent} plan`);
        card.setAttribute('tabindex', '0');
        
        // Keyboard support for pricing cards
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCardExpansion(card);
            }
        });
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, [tabindex="0"]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #f4d03f';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loading fade-out effect
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        body:not(.loaded) {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    
    document.head.appendChild(loadingStyles);
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            element.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s both`;
        });
    }, 300);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Graceful degradation - ensure basic functionality works
    if (e.error.message.includes('animation') || e.error.message.includes('transform')) {
        // Disable animations if there are issues
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0s !important;
                transition-duration: 0s !important;
            }
        `;
        document.head.appendChild(style);
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToSection,
        toggleCardExpansion,
        handlePlanSelection
    };
}