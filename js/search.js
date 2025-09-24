// Search functionality
class SearchManager {
    constructor() {
        this.searchOverlay = null;
        this.searchInput = null;
        this.searchResults = null;
        this.searchSuggestions = null;
        this.isOpen = false;
        this.searchData = [];
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.loadSearchData();
        console.log('Search manager initialized');
    }

    setupElements() {
        this.searchOverlay = document.getElementById('search-overlay');
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
        this.searchSuggestions = document.getElementById('search-suggestions');
    }

    setupEventListeners() {
        // Search toggle button
        const searchToggle = document.getElementById('search-toggle');
        if (searchToggle) {
            searchToggle.addEventListener('click', () => this.openSearch());
        }

        // Search close button
        const searchClose = document.getElementById('search-close');
        if (searchClose) {
            searchClose.addEventListener('click', () => this.closeSearch());
        }

        // Search input
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeSearch();
                }
            });
        }

        // Search button
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }

        // Suggestion tags
        const suggestionTags = document.querySelectorAll('.suggestion-tag');
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const searchTerm = tag.getAttribute('data-search');
                this.searchInput.value = searchTerm;
                this.performSearch();
            });
        });

        // Close on overlay click
        if (this.searchOverlay) {
            this.searchOverlay.addEventListener('click', (e) => {
                if (e.target === this.searchOverlay) {
                    this.closeSearch();
                }
            });
        }
    }

    loadSearchData() {
        // Load searchable content from the website
        this.searchData = [
            // Projects
            {
                type: 'project',
                title: 'בית פרטי מודרני',
                description: 'בניית בית פרטי מודרני עם עיצוב נקי ומינימליסטי',
                keywords: ['בית', 'פרטי', 'מודרני', 'בנייה', 'עיצוב'],
                url: '#projects'
            },
            {
                type: 'project',
                title: 'שיפוץ דירת פנטהאוז',
                description: 'שיפוץ מלא של דירת פנטהאוז עם נוף לים',
                keywords: ['שיפוץ', 'נטהאוז', 'דירה', 'נוף', 'ים'],
                url: '#projects'
            },
            {
                type: 'project',
                title: 'משרדים מסחריים',
                description: 'בניית בניין משרדים חדש עם 3 קומות',
                keywords: ['משרדים', 'מסחרי', 'בניין', 'קומות'],
                url: '#projects'
            },
            {
                type: 'project',
                title: 'בית קוטג\' כפרי',
                description: 'בניית בית קוטג\' כפרי עם גינה גדולה',
                keywords: ['קוטג', 'כפרי', 'גינה', 'בית'],
                url: '#projects'
            },
            {
                type: 'project',
                title: 'שיפוץ דירת סטודיו',
                description: 'שיפוץ מלא של דירת סטודיו עם עיצוב חכם',
                keywords: ['שיפוץ', 'סטודיו', 'דירה', 'עיצוב', 'חכם'],
                url: '#projects'
            },
            {
                type: 'project',
                title: 'מרכז קניות',
                description: 'בניית מרכז קניות עם 20 חנויות וחניון גדול',
                keywords: ['מרכז', 'קניות', 'חנויות', 'חניון'],
                url: '#projects'
            },
            // Services
            {
                type: 'service',
                title: 'בנייה חדשה',
                description: 'שירותי בנייה חדשה מקצועיים',
                keywords: ['בנייה', 'חדשה', 'שירותים', 'מקצועי'],
                url: '#services'
            },
            {
                type: 'service',
                title: 'שיפוץ דירות',
                description: 'שיפוץ דירות מקצועי ואיכותי',
                keywords: ['שיפוץ', 'דירות', 'מקצועי', 'איכותי'],
                url: '#services'
            },
            {
                type: 'service',
                title: 'עיצוב פנים',
                description: 'שירותי עיצוב פנים מודרני',
                keywords: ['עיצוב', 'פנים', 'מודרני', 'שירותים'],
                url: '#services'
            },
            {
                type: 'service',
                title: 'תחזוקה ושיפוצים',
                description: 'שירותי תחזוקה ושיפוצים מקצועיים',
                keywords: ['תחזוקה', 'שיפוצים', 'מקצועי', 'שירותים'],
                url: '#services'
            },
            // Work types
            {
                type: 'work',
                title: 'עבודות גבס',
                description: 'התקנה ועיצוב גבס מקצועי',
                keywords: ['גבס', 'התקנה', 'עיצוב', 'מקצועי'],
                url: '#quote'
            },
            {
                type: 'work',
                title: 'עבודות צבע',
                description: 'צביעה מקצועית ואיכותית',
                keywords: ['צבע', 'צביעה', 'מקצועי', 'איכותי'],
                url: '#quote'
            },
            {
                type: 'work',
                title: 'עבודות חשמל',
                description: 'התקנה ותחזוקה של מערכות חשמל',
                keywords: ['חשמל', 'התקנה', 'תחזוקה', 'מערכות'],
                url: '#quote'
            },
            {
                type: 'work',
                title: 'עבודות איטום',
                description: 'שירותי איטום מקצועיים',
                keywords: ['איטום', 'שירותים', 'מקצועי'],
                url: '#quote'
            }
        ];
    }

    openSearch() {
        this.isOpen = true;
        this.searchOverlay.classList.add('active');
        this.searchInput.focus();
        document.body.style.overflow = 'hidden';
    }

    closeSearch() {
        this.isOpen = false;
        this.searchOverlay.classList.remove('active');
        this.searchInput.value = '';
        this.clearResults();
        document.body.style.overflow = '';
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.clearResults();
            return;
        }

        const results = this.searchData.filter(item => {
            const searchText = `${item.title} ${item.description} ${item.keywords.join(' ')}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        this.displayResults(results, query);
    }

    performSearch() {
        const query = this.searchInput.value.trim();
        if (query.length < 2) return;

        const results = this.searchData.filter(item => {
            const searchText = `${item.title} ${item.description} ${item.keywords.join(' ')}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        this.displayResults(results, query);
    }

    displayResults(results, query) {
        this.searchResults.innerHTML = '';

        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>לא נמצאו תוצאות עבור "${query}"</p>
                    <p>נסה מילות מפתח אחרות</p>
                </div>
            `;
            return;
        }

        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result-item';
            resultElement.innerHTML = `
                <h5>${this.highlightText(result.title, query)}</h5>
                <p>${this.highlightText(result.description, query)}</p>
                <small>${this.getTypeLabel(result.type)}</small>
            `;

            resultElement.addEventListener('click', () => {
                this.navigateToResult(result);
            });

            this.searchResults.appendChild(resultElement);
        });
    }

    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    getTypeLabel(type) {
        const labels = {
            'project': 'פרויקט',
            'service': 'שירות',
            'work': 'סוג עבודה'
        };
        return labels[type] || type;
    }

    navigateToResult(result) {
        this.closeSearch();
        
        // Navigate to the relevant page
        if (window.NavigationManager) {
            const pageId = result.url.replace('#', '');
            window.NavigationManager.navigateToPage(pageId);
        }
    }

    clearResults() {
        this.searchResults.innerHTML = '';
    }
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.SearchManager = new SearchManager();
});

// Export for global access
window.SearchManager = SearchManager;
