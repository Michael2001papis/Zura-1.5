// קובץ JavaScript ראשי לאתר הקבלן
// Main JavaScript file for the contractor website

// משתנים גלובליים
// Global variables
let isMenuOpen = false;

// אלמנטים מהדום
// DOM elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const mainContent = document.getElementById('main-content');

// אתחול האפליקציה
// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * אתחול כל הפונקציונליות של האפליקציה
 * Initialize all app functionality
 */
function initializeApp() {
    setupMobileNavigation();
    setupScrollEffects();
    setupAnimations();
    setupLazyLoading();
    console.log('Contractor website initialized successfully!');
}

/**
 * הגדרת תפריט נייד
 * Setup mobile navigation menu
 */
function setupMobileNavigation() {
    // כפתור פתיחת/סגירת תפריט נייד
    // Mobile menu toggle button
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // סגירת תפריט נייד בלחיצה על קישור
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                closeMobileMenu();
            }
        });
    });

    // סגירת תפריט נייד בלחיצה מחוץ לתפריט
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

/**
 * החלפת מצב תפריט נייד (פתוח/סגור)
 * Toggle mobile menu state
 */
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
}

/**
 * פתיחת תפריט נייד
 * Open mobile menu
 */
function openMobileMenu() {
    navMenu.classList.add('active');
    navToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
    isMenuOpen = true;
}

/**
 * סגירת תפריט נייד
 * Close mobile menu
 */
function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = '';
    isMenuOpen = false;
}

/**
 * הגדרת אפקטי גלילה
 * Setup scroll effects for navbar
 */
function setupScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', Utils.throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // הוספת רקע לניווט בגלילה
        // Navbar background on scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // הסתרה/הצגה של ניווט בגלילה
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // גלילה למטה - הסתר
            // Scrolling down - hide
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // גלילה למעלה - הצג
            // Scrolling up - show
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, 100));
}

/**
 * הגדרת אנימציות לאלמנטים
 * Setup animations for elements using Intersection Observer
 */
function setupAnimations() {
    // הגדרות למתבונן Intersection Observer
    // Intersection Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // צפייה באלמנטים לאנימציה
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .project-card, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * הגדרת טעינת תמונות עצלה (lazy loading)
 * Setup lazy loading for images
 */
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // טען תמונה אם יש data-src
                    // Load image if data-src exists
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * הצגת מצב טעינה על אלמנט
 * Show loading state on element
 * @param {HTMLElement} element - אלמנט להצגת מצב טעינה
 */
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
    }
}

/**
 * הסתרת מצב טעינה מאלמנט
 * Hide loading state from element
 * @param {HTMLElement} element - אלמנט להסתרת מצב טעינה
 */
function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
    }
}

// ייצוא פונקציות לשימוש במודולים אחרים
// Export functions for use in other modules
// הערה: פונקציות utils נמצאות ב-Utils, פונקציות ניווט נמצאות ב-NavigationManager
// Note: utils functions are in Utils, navigation functions are in NavigationManager
window.ContractorApp = {
    showLoading,
    hideLoading,
    // הפניה לפונקציות מ-Utils
    // Reference to Utils functions
    showToast: (...args) => Utils.showToast(...args),
    formatPhoneNumber: (...args) => Utils.formatPhoneNumber(...args),
    validateEmail: (...args) => Utils.validateEmail(...args),
    validatePhone: (...args) => Utils.validatePhone(...args),
    smoothScrollTo: (...args) => Utils.smoothScrollTo(...args),
    // הפניה לפונקציות ניווט (נמצאות ב-navigation.js)
    // Reference to navigation functions (located in navigation.js)
    navigateToPage: (pageId) => {
        if (window.NavigationManager) {
            window.NavigationManager.navigateToPage(pageId);
        }
    }
};
