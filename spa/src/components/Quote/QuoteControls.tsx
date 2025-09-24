import React from 'react';
import type { BaseComponentProps } from '../../types/index.js';

interface QuoteControlsProps extends BaseComponentProps {
  onAddRow: () => void;
  onDuplicateRow: () => void;
  rowCount: number;
  isAdding?: boolean;
}

export const QuoteControls: React.FC<QuoteControlsProps> = ({
  onAddRow,
  onDuplicateRow,
  rowCount,
  isAdding = false,
  className = ''
}) => {
  return (
    <div className={`quote-controls ${className}`}>
      <div className="controls-left">
        <button 
          className="btn add-btn" 
          onClick={onAddRow}
          disabled={isAdding}
        >
          <span className="btn-icon">➕</span>
          <span>{isAdding ? 'מוסיף...' : 'הוסף שורה חדשה'}</span>
        </button>
        
        <button 
          className="btn duplicate-btn" 
          onClick={onDuplicateRow}
          disabled={isAdding}
        >
          <span className="btn-icon">📋</span>
          <span>שכפל שורה</span>
        </button>
      </div>
      
      <div className="controls-right">
        <div className="row-count">
          <span className="count-number">{rowCount}</span>
          <span className="count-label">שורות</span>
        </div>
      </div>
    </div>
  );
};
