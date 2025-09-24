import React from 'react';
import type { QuoteTotals, BaseComponentProps } from '../../types/index.js';

interface QuoteSummaryProps extends BaseComponentProps {
  totals: QuoteTotals;
  isLoading?: boolean;
}

export const QuoteSummary: React.FC<QuoteSummaryProps> = ({
  totals,
  isLoading = false,
  className = ''
}) => {
  if (isLoading) {
    return (
      <div className={`summary-section ${className}`}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>מחשב סיכום...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`summary-section ${className}`}>
      <div className="summary-header">
        <h3>📋 סיכום הצעת המחיר</h3>
        <p>סיכום מפורט של כל העלויות</p>
      </div>
      
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon">💵</div>
          <div className="card-content">
            <h4>ללא מע״מ</h4>
            <span className="amount">{totals.withoutVAT.toFixed(2)} ₪</span>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-icon">🧾</div>
          <div className="card-content">
            <h4>מע״מ (18%)</h4>
            <span className="amount">{totals.vat.toFixed(2)} ₪</span>
          </div>
        </div>
        
        <div className="summary-card total-card">
          <div className="card-icon">💎</div>
          <div className="card-content">
            <h4>סה״כ כולל מע״מ</h4>
            <span className="amount total-amount">{totals.withVAT.toFixed(2)} ₪</span>
          </div>
        </div>
      </div>
    </div>
  );
};
