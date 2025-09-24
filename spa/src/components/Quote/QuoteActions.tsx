import React from 'react';
import type { BaseComponentProps } from '../../types/index.js';

interface QuoteActionsProps extends BaseComponentProps {
  onPrint: () => void;
  onEmail: () => void;
  onSave: () => void;
  onReset: () => void;
  isProcessing?: boolean;
}

export const QuoteActions: React.FC<QuoteActionsProps> = ({
  onPrint,
  onEmail,
  onSave,
  onReset,
  isProcessing = false,
  className = ''
}) => {
  const handleReset = () => {
    if (confirm('האם אתה בטוח שברצונך לאפס את כל הנתונים?')) {
      onReset();
    }
  };

  return (
    <div className={`quote-actions ${className}`}>
      <div className="action-buttons">
        <button 
          className="btn print-btn" 
          onClick={onPrint}
          disabled={isProcessing}
        >
          <span className="btn-icon">🖨️</span>
          <span>{isProcessing ? 'מעבד...' : 'הדפס הצעה'}</span>
        </button>
        
        <button 
          className="btn email-btn" 
          onClick={onEmail}
          disabled={isProcessing}
        >
          <span className="btn-icon">📧</span>
          <span>{isProcessing ? 'שולח...' : 'שלח באימייל'}</span>
        </button>
        
        <button 
          className="btn save-btn" 
          onClick={onSave}
          disabled={isProcessing}
        >
          <span className="btn-icon">💾</span>
          <span>{isProcessing ? 'שומר...' : 'שמור הצעה'}</span>
        </button>
      </div>
      
      <div className="reset-section">
        <button 
          className="btn reset-btn" 
          onClick={handleReset}
          disabled={isProcessing}
        >
          <span className="btn-icon">🔄</span>
          <span>איפוס מלא</span>
        </button>
      </div>
    </div>
  );
};
