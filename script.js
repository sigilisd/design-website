// Mobile Navigation
function showMenu() {
    document.getElementById("navLinks").classList.add("show");
}

function hideMenu() {
    document.getElementById("navLinks").classList.remove("show");
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hideMenu();
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to top button functionality
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Contact form functionality
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Пожалуйста, введите корректный email', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        default: return '#17a2b8';
    }
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Parallax effect for hero section - Simplified
// Removed for simplicity

// Typing effect for hero title (optimized)
function typeWriter(element, text, speed = 50) {
    let index = 0;
    const originalHTML = element.innerHTML;
    element.textContent = '';
    
    function typeNext() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeNext, speed);
        }
    }
    
    typeNext();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent.trim();
        // Use requestIdleCallback or fallback to setTimeout to avoid blocking first paint
        const startTyping = () => typeWriter(heroTitle, originalText, 50);
        if ('requestIdleCallback' in window) {
            requestIdleCallback(startTyping, { timeout: 200 });
        } else {
            setTimeout(startTyping, 50);
        }
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Hover effects for service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Work items hover effect
document.addEventListener('DOMContentLoaded', () => {
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.work-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.work-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading class to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('loading');
        }, index * 200);
    });
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
`;

document.head.appendChild(notificationStyles);

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');
revealSections.forEach(section => {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sectionObserver.observe(section);
});

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Add initial styles for smooth animations
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Fade in body
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize all interactive elements
    console.log('Lilith Digital Agency website loaded successfully! 🚀');
}); 