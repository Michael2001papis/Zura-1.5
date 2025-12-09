// ניהול ניווט באתר - Single Page Application (SPA)
// Navigation management - Single Page Application (SPA)

/**
 * NavigationManager - מנהל ניווט מרכזי
 * NavigationManager - Central navigation manager
 */
class NavigationManager {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    /**
     * אתחול מנהל הניווט
     * Initialize navigation manager
     */
    init() {
        this.setupEventListeners();
        this.updatePageFromHash();
        this.initializePageContent();
        
        // האזנה לשינוי hash
        // Listen to hash changes
        window.addEventListener('hashchange', () => {
            this.updatePageFromHash();
        });
    }

    /**
     * הגדרת מאזינים לאירועים
     * Setup event listeners
     */
    setupEventListeners() {
        // מאזין לקישורי ניווט
        // Listen to navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-page]');
            if (link) {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                this.navigateToPage(pageId);
            }
        });
    }

    /**
     * ניווט לעמוד ספציפי
     * Navigate to specific page
     */
    navigateToPage(pageId) {
        if (!pageId) return;

        // עדכון hash
        // Update hash
        window.location.hash = pageId;

        // עדכון עמוד נוכחי
        // Update current page
        this.currentPage = pageId;

        // הסתרת כל העמודים
        // Hide all pages
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));

        // הצגת העמוד הנבחר
        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // עדכון קישור פעיל בתפריט
        // Update active link in menu
        this.updateActiveNavLink(pageId);

        // גלילה למעלה
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * עדכון קישור פעיל בתפריט
     * Update active navigation link
     */
    updateActiveNavLink(pageId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
    }

    /**
     * עדכון עמוד לפי hash ב-URL
     * Update page based on URL hash
     */
    updatePageFromHash() {
        const hash = window.location.hash.slice(1) || 'home';
        this.navigateToPage(hash);
    }

    /**
     * אתחול תוכן העמודים
     * Initialize page content
     */
    initializePageContent() {
        // אתחול תוכן ספציפי לפי עמוד
        // Initialize specific content per page
        
        // אם יש ProjectsManager, טען פרויקטים
        // If ProjectsManager exists, load projects
        if (window.ProjectsManager && this.currentPage === 'projects') {
            window.ProjectsManager.loadProjects();
        }
    }

    /**
     * קבלת עמוד נוכחי
     * Get current page
     */
    getCurrentPage() {
        return this.currentPage;
    }
}

// יצירת מופע גלובלי
// Create global instance
window.NavigationManager = new NavigationManager();

// ייצוא למקרה שצריך
// Export if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}

