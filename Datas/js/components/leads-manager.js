// Leads Manager - ניהול לידים
// Simple leads management system

class LeadsManager {
    constructor() {
        this.leads = [];
        this.init();
    }

    init() {
        this.loadLeads();
        console.log('Leads Manager initialized');
    }

    loadLeads() {
        // Load from localStorage
        const stored = localStorage.getItem('zura_leads');
        if (stored) {
            this.leads = JSON.parse(stored);
        }
        return this.leads;
    }

    saveLeads() {
        localStorage.setItem('zura_leads', JSON.stringify(this.leads));
    }

    addLead(leadData) {
        const lead = {
            id: Date.now(),
            ...leadData,
            createdAt: new Date().toISOString(),
            status: leadData.status || 'new',
            notes: leadData.notes || ''
        };

        this.leads.unshift(lead); // Add to beginning
        this.saveLeads();
        
        return lead;
    }

    updateLeadStatus(leadId, newStatus) {
        const lead = this.leads.find(l => l.id === leadId);
        if (lead) {
            lead.status = newStatus;
            lead.updatedAt = new Date().toISOString();
            this.saveLeads();
            return lead;
        }
        return null;
    }

    addNote(leadId, note) {
        const lead = this.leads.find(l => l.id === leadId);
        if (lead) {
            if (!lead.notes) lead.notes = '';
            lead.notes += `\n[${new Date().toLocaleString('he-IL')}] ${note}`;
            this.saveLeads();
            return lead;
        }
        return null;
    }

    deleteLead(leadId) {
        this.leads = this.leads.filter(l => l.id !== leadId);
        this.saveLeads();
    }

    getLeadsByStatus(status) {
        return this.leads.filter(l => l.status === status);
    }

    searchLeads(query) {
        const lowerQuery = query.toLowerCase();
        return this.leads.filter(lead => {
            return (
                lead.customerName?.toLowerCase().includes(lowerQuery) ||
                lead.customerPhone?.includes(query) ||
                lead.city?.toLowerCase().includes(lowerQuery) ||
                lead.workType?.toLowerCase().includes(lowerQuery)
            );
        });
    }

    exportToCSV() {
        if (this.leads.length === 0) {
            alert('אין לידים לייצוא');
            return;
        }

        const headers = ['תאריך', 'שם', 'טלפון', 'עיר', 'סוג עבודה', 'תקציב', 'סטטוס'];
        const rows = this.leads.map(lead => {
            return [
                new Date(lead.createdAt || lead.timestamp).toLocaleDateString('he-IL'),
                lead.customerName || '',
                lead.customerPhone || '',
                lead.city || '',
                lead.workType || '',
                lead.budget || '',
                lead.status || 'new'
            ];
        });

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const BOM = '\uFEFF';
        const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    getStats() {
        const stats = {
            total: this.leads.length,
            new: this.getLeadsByStatus('new').length,
            inProgress: this.getLeadsByStatus('in-progress').length,
            closed: this.getLeadsByStatus('closed').length,
            byWorkType: {},
            byCity: {}
        };

        this.leads.forEach(lead => {
            // Count by work type
            const workType = lead.workType || 'other';
            stats.byWorkType[workType] = (stats.byWorkType[workType] || 0) + 1;

            // Count by city
            const city = lead.city || 'לא צוין';
            stats.byCity[city] = (stats.byCity[city] || 0) + 1;
        });

        return stats;
    }
}

// Initialize leads manager
window.LeadsManager = new LeadsManager();

// Export for global access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LeadsManager;
}
