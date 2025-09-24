import React from 'react';
import type { QuoteRow, BaseComponentProps } from '../../types/index.js';

interface QuoteTableProps extends BaseComponentProps {
  rows: QuoteRow[];
  onUpdateRow: (id: string | number, field: keyof QuoteRow, value: unknown) => void;
  onRemoveRow: (id: string | number) => void;
  isLoading?: boolean;
}

const LOCATION_OPTIONS = [
  { value: 'דירה', label: '🏠 דירה' },
  { value: 'בית', label: '🏡 בית פרטי' },
  { value: 'משרד', label: '🏢 משרד' },
  { value: 'חנות', label: '🏪 חנות' },
  { value: 'מחסן', label: '🏭 מחסן' }
];

const WORK_TYPE_OPTIONS = [
  { value: 'הריסה', label: '🔨 הריסה' },
  { value: 'בניה', label: '🏗️ בניה' },
  { value: 'צבע', label: '🎨 צבע' },
  { value: 'ריצוף', label: '🔲 ריצוף' },
  { value: 'אינסטלציה', label: '🚿 אינסטלציה' },
  { value: 'חשמל', label: '⚡ חשמל' },
  { value: 'גבס', label: '🧱 גבס' }
];

const PERCENT_OPTIONS = [
  { value: 100, label: '100%' },
  { value: 90, label: '90%' },
  { value: 80, label: '80%' },
  { value: 70, label: '70%' },
  { value: 60, label: '60%' },
  { value: 50, label: '50%' }
];

export const QuoteTable: React.FC<QuoteTableProps> = ({
  rows,
  onUpdateRow,
  onRemoveRow,
  isLoading = false,
  className = ''
}) => {
  const calculateRowTotals = (row: QuoteRow) => {
    const withoutVAT = row.quantity * (row.percent / 100) * row.price;
    const vat = withoutVAT * 0.18;
    const withVAT = withoutVAT + vat;
    
    return { withoutVAT, vat, withVAT };
  };

  if (isLoading) {
    return (
      <div className={`table-container ${className}`}>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>טוען נתונים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`quote-table-section ${className}`}>
      <div className="table-header">
        <h3>📊 פרטי הפרויקט</h3>
        <p>מלא את הפרטים עבור כל פריט בפרויקט</p>
      </div>
      
      <div className="table-container">
        <table className="calculation-table">
          <thead>
            <tr>
              <th>🏠 מיקום</th>
              <th>🔨 סוג עבודה</th>
              <th>📊 כמות</th>
              <th>📈 אחוז</th>
              <th>💰 מחיר יחידה</th>
              <th>💵 ללא מע״מ</th>
              <th>🧾 מע״מ</th>
              <th>💸 כולל מע״מ</th>
              <th>🗑️ פעולות</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const totals = calculateRowTotals(row);
              
              return (
                <tr key={row.id} className="data-row">
                  <td>
                    <select 
                      className="form-select" 
                      value={row.location}
                      onChange={(e) => onUpdateRow(row.id, 'location', e.target.value)}
                    >
                      {LOCATION_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  
                  <td>
                    <select 
                      className="form-select" 
                      value={row.workType}
                      onChange={(e) => onUpdateRow(row.id, 'workType', e.target.value)}
                    >
                      {WORK_TYPE_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  
                  <td>
                    <input 
                      type="number" 
                      className="form-input"
                      placeholder="0"
                      min="0"
                      step="0.1"
                      value={row.quantity}
                      onChange={(e) => onUpdateRow(row.id, 'quantity', parseFloat(e.target.value) || 0)}
                    />
                  </td>
                  
                  <td>
                    <select 
                      className="form-select"
                      value={row.percent}
                      onChange={(e) => onUpdateRow(row.id, 'percent', parseFloat(e.target.value))}
                    >
                      {PERCENT_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  
                  <td>
                    <input 
                      type="number" 
                      className="form-input"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={row.price}
                      onChange={(e) => onUpdateRow(row.id, 'price', parseFloat(e.target.value) || 0)}
                    />
                  </td>
                  
                  <td className="result-cell">
                    <span className="amount">{totals.withoutVAT.toFixed(2)} ₪</span>
                  </td>
                  
                  <td className="result-cell">
                    <span className="amount">{totals.vat.toFixed(2)} ₪</span>
                  </td>
                  
                  <td className="result-cell total-cell">
                    <span className="amount total-amount">{totals.withVAT.toFixed(2)} ₪</span>
                  </td>
                  
                  <td className="actions-cell">
                    <button 
                      className="btn delete-btn"
                      onClick={() => onRemoveRow(row.id)}
                      disabled={rows.length === 1}
                      title="מחק שורה"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
