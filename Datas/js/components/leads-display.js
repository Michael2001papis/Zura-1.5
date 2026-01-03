// Leads Display - הצגת לידים
// Simple leads display component

class LeadsDisplay {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        // Setup immediately if DOM is ready, otherwise wait
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.container = document.getElementById('leads-container');
        if (!this.container) return;

        // Listen for navigation to leads page
        window.addEventListener('hashchange', () => {
            if (window.location.hash === '#leads') {
                this.displayLeads();
            }
        });

        // Check if we're already on leads page
        if (window.location.hash === '#leads' || document.getElementById('leads')?.classList.contains('active')) {
            this.displayLeads();
        }

        // Also listen to NavigationManager if available (only if not already overridden)
        if (window.NavigationManager && !window.NavigationManager._leadsDisplayOverride) {
            const originalNavigate = window.NavigationManager.navigateToPage.bind(window.NavigationManager);
            window.NavigationManager.navigateToPage = (pageId) => {
                originalNavigate(pageId);
                if (pageId === 'leads') {
                    setTimeout(() => this.displayLeads(), 200);
                }
            };
            window.NavigationManager._leadsDisplayOverride = true;
        }

        // Also check on page load
        setTimeout(() => {
            const leadsPage = document.getElementById('leads');
            if (leadsPage && leadsPage.classList.contains('active')) {
                this.displayLeads();
            }
        }, 300);
    }

    displayLeads() {
        if (!this.container) return;

        // Wait for LeadsManager to be ready
        if (!window.LeadsManager) {
            setTimeout(() => this.displayLeads(), 100);
            return;
        }

        const leads = window.LeadsManager.loadLeads();

        if (leads.length === 0) {
            this.container.innerHTML = `
                <div class="no-leads">
                    <i class="fas fa-inbox"></i>
                    <p>אין לידים עדיין</p>
                    <p class="no-leads-subtitle">לידים חדשים יופיעו כאן לאחר שליחה מהטופס</p>
                </div>
            `;
            return;
        }

        // Display leads
        let html = `<div class="leads-list">`;
        
        leads.forEach((lead, index) => {
            const workTypeNames = {
                'renovation': 'שיפוץ כללי',
                'paint': 'צבע',
                'flooring': 'ריצוף',
                'plumbing': 'אינסטלציה',
                'gypsum': 'גבס',
                'insulation': 'איטום',
                'electrical': 'חשמל',
                'other': 'אחר'
            };

            const statusNames = {
                'new': 'חדש',
                'in-progress': 'בטיפול',
                'closed': 'נסגר'
            };

            const statusColors = {
                'new': '#28a745',
                'in-progress': '#ffc107',
                'closed': '#6c757d'
            };

            const date = lead.createdAt || lead.timestamp;
            const formattedDate = date ? new Date(date).toLocaleString('he-IL') : 'לא צוין';

            html += `
                <div class="lead-item" data-lead-id="${lead.id}">
                    <div class="lead-header">
                        <div class="lead-number">#${leads.length - index}</div>
                        <div class="lead-status" style="background-color: ${statusColors[lead.status] || '#6c757d'}">
                            ${statusNames[lead.status] || 'חדש'}
                        </div>
                    </div>
                    <div class="lead-content">
                        <div class="lead-info-row">
                            <strong>שם:</strong> ${lead.customerName || 'לא צוין'}
                        </div>
                        <div class="lead-info-row">
                            <strong>טלפון:</strong> <a href="tel:${lead.customerPhone || ''}">${lead.customerPhone || 'לא צוין'}</a>
                        </div>
                        <div class="lead-info-row">
                            <strong>עיר:</strong> ${lead.city || 'לא צוין'}
                        </div>
                        <div class="lead-info-row">
                            <strong>סוג עבודה:</strong> ${workTypeNames[lead.workType] || lead.workType || 'לא צוין'}
                        </div>
                        ${lead.budget ? `<div class="lead-info-row"><strong>תקציב:</strong> ${lead.budget}</div>` : ''}
                        ${lead.notes ? `<div class="lead-info-row"><strong>הערות:</strong> ${lead.notes}</div>` : ''}
                        <div class="lead-info-row lead-date">
                            <strong>תאריך:</strong> ${formattedDate}
                        </div>
                    </div>
                    <div class="lead-actions">
                        <button class="btn btn-small btn-status" data-lead-id="${lead.id}" data-status="in-progress">
                            בטיפול
                        </button>
                        <button class="btn btn-small btn-status" data-lead-id="${lead.id}" data-status="closed">
                            נסגר
                        </button>
                        <a href="https://wa.me/972${lead.customerPhone?.replace(/\D/g, '') || ''}" class="btn btn-small btn-whatsapp" target="_blank">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        html += `<div class="leads-actions">
            <button class="btn btn-primary" id="export-leads-btn">
                <i class="fas fa-download"></i> ייצא ל-CSV
            </button>
            <button class="btn btn-secondary" id="refresh-leads-btn">
                <i class="fas fa-sync"></i> רענן
            </button>
        </div>`;

        this.container.innerHTML = html;

        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Status buttons
        document.querySelectorAll('.btn-status').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const leadId = parseInt(e.target.dataset.leadId);
                const newStatus = e.target.dataset.status;
                this.updateLeadStatus(leadId, newStatus);
            });
        });

        // Export button
        const exportBtn = document.getElementById('export-leads-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                if (window.LeadsManager) {
                    window.LeadsManager.exportToCSV();
                }
            });
        }

        // Refresh button
        const refreshBtn = document.getElementById('refresh-leads-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.displayLeads();
            });
        }
    }

    updateLeadStatus(leadId, newStatus) {
        if (!window.LeadsManager) return;

        window.LeadsManager.updateLeadStatus(leadId, newStatus);
        this.displayLeads();
        Utils.showToast('סטטוס עודכן בהצלחה', 'success');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.LeadsDisplay = new LeadsDisplay();
});

// Also initialize after a short delay to ensure LeadsManager is ready
setTimeout(() => {
    if (window.LeadsDisplay) {
        window.LeadsDisplay.displayLeads();
    }
}, 500);
