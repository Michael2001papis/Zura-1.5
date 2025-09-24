// Navigation functionality for SPA

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
});

// Initialize navigation functionality
function initializeNavigation() {
    setupPageNavigation();
    setupButtonNavigation();
    setupHashNavigation();
}

// Setup page navigation links
function setupPageNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.dataset.page;
            
            if (targetPage && targetPage !== window.ContractorApp?.currentPage) {
                navigateToPage(targetPage);
            }
        });
    });
}

// Setup button navigation
function setupButtonNavigation() {
    const buttons = document.querySelectorAll('a[data-page]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.dataset.page;
            
            if (targetPage) {
                navigateToPage(targetPage);
            }
        });
    });
}

// Setup hash-based navigation
function setupHashNavigation() {
    // Handle hash changes
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            navigateToPage(hash);
        } else {
            navigateToPage('home');
        }
    });
    
    // Handle initial hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        navigateToPage(initialHash);
    }
}

// Navigate to specific page
function navigateToPage(pageId) {
    // Get all pages
    const pages = document.querySelectorAll('.page');
    const targetPage = document.getElementById(pageId);
    
    if (!targetPage) {
        console.warn(`Page with id "${pageId}" not found`);
        return;
    }
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    targetPage.classList.add('active');
    
    // Update active navigation link
    updateActiveNavLink(pageId);
    
    // Update current page variable
    if (window.ContractorApp) {
        window.ContractorApp.currentPage = pageId;
    }
    
    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Update URL hash (without triggering hashchange event)
    if (pageId !== 'home') {
        const newUrl = window.location.pathname + '#' + pageId;
        history.pushState(null, null, newUrl);
    } else {
        history.pushState(null, null, window.location.pathname);
    }
    
    // Trigger page-specific initialization
    initializePageContent(pageId);
    
    console.log(`Navigated to page: ${pageId}`);
}

// Update active navigation link
function updateActiveNavLink(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });
}

// Initialize page-specific content
function initializePageContent(pageId) {
    switch (pageId) {
        case 'home':
            initializeHomePage();
            break;
        case 'about':
            initializeAboutPage();
            break;
        case 'services':
            initializeServicesPage();
            break;
        case 'projects':
            initializeProjectsPage();
            break;
        case 'contact':
            initializeContactPage();
            break;
        case 'quote':
            initializeQuotePage();
            break;
        case 'copyright':
            initializeCopyrightPage();
            break;
        default:
            console.log(`No specific initialization for page: ${pageId}`);
    }
}

// Initialize home page
function initializeHomePage() {
    // Add any home page specific functionality
    console.log('Home page initialized');
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Initialize about page
function initializeAboutPage() {
    console.log('About page initialized');
    
    // Add any about page specific functionality
    const aboutImage = document.querySelector('.about-image img');
    if (aboutImage) {
        aboutImage.style.opacity = '0';
        aboutImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            aboutImage.style.transition = 'all 0.6s ease';
            aboutImage.style.opacity = '1';
            aboutImage.style.transform = 'scale(1)';
        }, 200);
    }
}

// Initialize services page
function initializeServicesPage() {
    console.log('Services page initialized');
    
    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
}

// Initialize projects page
function initializeProjectsPage() {
    console.log('Projects page initialized');
    
    // Load projects if not already loaded
    if (window.ProjectsManager && !window.ProjectsManager.projectsLoaded) {
        window.ProjectsManager.loadProjects();
    }
}

// Initialize contact page
function initializeContactPage() {
    console.log('Contact page initialized');
    
    // Initialize contact form if not already done
    if (window.ContactManager && !window.ContactManager.formInitialized) {
        window.ContactManager.initializeForm();
    }
}

// Handle browser back/forward navigation
window.addEventListener('popstate', function(event) {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateToPage(hash);
    } else {
        navigateToPage('home');
    }
});

// Handle page refresh with hash
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateToPage(hash);
    }
});

// Initialize quote page
function initializeQuotePage() {
    console.log('Quote page initialized');
    
    // Initialize quote calculator if not already done
    if (window.QuoteManager && !window.QuoteManager.quoteInitialized) {
        window.QuoteManager.initializeQuote();
    }
}

// Initialize copyright page
function initializeCopyrightPage() {
    console.log('Copyright page initialized');
    
    // Update last update date
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        lastUpdateElement.textContent = now.toLocaleDateString('he-IL', options);
    }
    
    // Add any copyright page specific functionality
    const copyrightSections = document.querySelectorAll('.copyright-section');
    copyrightSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
}

// Export navigation functions
window.NavigationManager = {
    navigateToPage,
    updateActiveNavLink,
    initializePageContent
};
