// Projects management and display functionality

// Projects data
const projectsData = [
    {
        id: 1,
        title: "בית פרטי מודרני",
        category: "residential",
        description: "בניית בית פרטי מודרני עם עיצוב נקי ומינימליסטי. הפרויקט כולל 4 חדרי שינה, סלון רחב ומטבח מודרני.",
        image: "Datas/assets/images/projects/house-1.svg",
        features: ["4 חדרי שינה", "מטבח מודרני", "גינה פרטית", "מחסן"],
        year: "2024",
        area: "180 מ\"ר"
    },
    {
        id: 2,
        title: "שיפוץ דירת פנטהאוז",
        category: "renovation",
        description: "שיפוץ מלא של דירת פנטהאוז עם נוף לים. הפרויקט כלל שיפוץ המטבח, חדרי הרחצה והסלון.",
        image: "Datas/assets/images/projects/penthouse-1.svg",
        features: ["שיפוץ מטבח", "2 חדרי רחצה", "מרפסת רחבה", "נוף לים"],
        year: "2024",
        area: "120 מ\"ר"
    },
    {
        id: 3,
        title: "משרדים מסחריים",
        category: "commercial",
        description: "בניית בניין משרדים חדש עם 3 קומות. הפרויקט כולל חניון תת-קרקעי ומעליות.",
        image: "Datas/assets/images/projects/office-1.svg",
        features: ["3 קומות", "חניון תת-קרקעי", "2 מעליות", "מערכת מיזוג מרכזית"],
        year: "2023",
        area: "800 מ\"ר"
    },
    {
        id: 4,
        title: "בית קוטג' כפרי",
        category: "residential",
        description: "בניית בית קוטג' כפרי עם גינה גדולה. העיצוב משולב עם הטבע הסביבתי.",
        image: "Datas/assets/images/projects/cottage-1.svg",
        features: ["3 חדרי שינה", "גינה גדולה", "מרפסת עץ", "אח"],
        year: "2023",
        area: "150 מ\"ר"
    },
    {
        id: 5,
        title: "שיפוץ דירת סטודיו",
        category: "renovation",
        description: "שיפוץ מלא של דירת סטודיו עם עיצוב חכם המנצל כל סנטימטר. הפרויקט כלל שיפוץ מלא של החלל.",
        image: "Datas/assets/images/projects/studio-1.svg",
        features: ["עיצוב חכם", "מטבח מודרני", "חדר רחצה", "מחסן מובנה"],
        year: "2024",
        area: "45 מ\"ר"
    },
    {
        id: 6,
        title: "מרכז קניות",
        category: "commercial",
        description: "בניית מרכז קניות עם 20 חנויות וחניון גדול. הפרויקט כולל מערכת מיזוג מרכזית ומעליות.",
        image: "Datas/assets/images/projects/mall-1.svg",
        features: ["20 חנויות", "חניון גדול", "מערכת מיזוג", "מעליות"],
        year: "2023",
        area: "2000 מ\"ר"
    }
];

// Projects manager class
class ProjectsManager {
    constructor() {
        this.projects = projectsData;
        this.filteredProjects = [...this.projects];
        this.currentFilter = 'all';
        this.projectsLoaded = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadProjects();
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterProjects(filter);
                this.updateActiveFilter(e.target);
            });
        });
    }

    loadProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        this.renderProjects(this.filteredProjects);
        this.projectsLoaded = true;
        console.log('Projects loaded successfully');
    }

    filterProjects(filter) {
        this.currentFilter = filter;
        
        if (filter === 'all') {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(project => 
                project.category === filter
            );
        }
        
        this.renderProjects(this.filteredProjects);
        console.log(`Filtered projects by: ${filter}`);
    }

    updateActiveFilter(activeButton) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    renderProjects(projects) {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        // Clear existing projects
        projectsGrid.innerHTML = '';

        if (projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="no-projects">
                    <p>לא נמצאו פרויקטים בקטגוריה זו.</p>
                </div>
            `;
            return;
        }

        // Render projects
        projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            projectsGrid.appendChild(projectCard);
        });

        // Add animation to new projects
        this.animateProjects();
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        const categoryNames = {
            'residential': 'מגורים',
            'commercial': 'מסחרי',
            'renovation': 'שיפוץ'
        };

        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.src='Datas/assets/images/placeholder-project.svg'">
                <div class="project-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
            <div class="project-content">
                <div class="project-category">${categoryNames[project.category]}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-details">
                    <span class="project-year">${project.year}</span>
                    <span class="project-area">${project.area}</span>
                </div>
                <div class="project-features">
                    ${project.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
            </div>
        `;

        // Add click event for project details
        card.addEventListener('click', () => {
            this.showProjectDetails(project);
        });

        return card;
    }

    animateProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showProjectDetails(project) {
        // Create modal for project details
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-image">
                        <img src="${project.image}" alt="${project.title}" onerror="this.src='Datas/assets/images/placeholder-project.svg'">
                    </div>
                    <div class="modal-info">
                        <h2>${project.title}</h2>
                        <p class="modal-description">${project.description}</p>
                        <div class="modal-details">
                            <div class="detail-item">
                                <strong>שנה:</strong> ${project.year}
                            </div>
                            <div class="detail-item">
                                <strong>שטח:</strong> ${project.area}
                            </div>
                        </div>
                        <div class="modal-features">
                            <h3>תכונות מיוחדות:</h3>
                            <ul>
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add close functionality
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');

        closeBtn.addEventListener('click', () => {
            this.closeModal(modal);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeModal(modal);
            }
        });

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }

    // Search projects by title or description
    searchProjects(query) {
        if (!query.trim()) {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(project => 
                project.title.toLowerCase().includes(query.toLowerCase()) ||
                project.description.toLowerCase().includes(query.toLowerCase())
            );
        }
        this.renderProjects(this.filteredProjects);
    }

    // Get projects by category
    getProjectsByCategory(category) {
        return this.projects.filter(project => project.category === category);
    }

    // Get project by ID
    getProjectById(id) {
        return this.projects.find(project => project.id === id);
    }
}

// Initialize projects manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.ProjectsManager = new ProjectsManager();
});

// Add CSS for project modal
const modalCSS = `
<style>
.project-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.project-modal.show {
    opacity: 1;
    visibility: visible;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.project-modal.show .modal-content {
    transform: scale(1);
}

.modal-close {
    position: absolute;
    top: 15px;
    left: 15px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #666;
    z-index: 1;
}

.modal-close:hover {
    color: #333;
}

.modal-image img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
}

.modal-info {
    padding: 2rem;
}

.modal-info h2 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.modal-description {
    color: var(--text-light);
    margin-bottom: 1.5rem;
}

.modal-details {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
}

.detail-item {
    color: var(--text-light);
}

.modal-features h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.modal-features ul {
    list-style: none;
    padding: 0;
}

.modal-features li {
    padding: 0.5rem 0;
    color: var(--text-light);
    position: relative;
    padding-right: 1.5rem;
}

.modal-features li::before {
    content: '✓';
    position: absolute;
    right: 0;
    color: var(--secondary-color);
    font-weight: bold;
}

.project-details {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
    font-size: 0.9rem;
    color: var(--text-light);
}

.project-features {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
}

.feature-tag {
    background-color: var(--background-light);
    color: var(--primary-color);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
}

.no-projects {
    text-align: center;
    padding: 3rem;
    color: var(--text-light);
}

@media (max-width: 768px) {
    .modal-content {
        margin: 10px;
        max-height: 95vh;
    }
    
    .modal-info {
        padding: 1rem;
    }
    
    .modal-details {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>
`;

// Add modal CSS to head
document.head.insertAdjacentHTML('beforeend', modalCSS);

// Export for global access
window.ProjectsManager = ProjectsManager;
