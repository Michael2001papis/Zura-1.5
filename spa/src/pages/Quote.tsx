import React, { useState } from 'react'

const Quote: React.FC = () => {
  const [rows, setRows] = useState([{ id: 1, quantity: 0, percent: 100, price: 0 }])
  const [totals, setTotals] = useState({ withoutVAT: 0, vat: 0, withVAT: 0 })

  const addRow = () => {
    setRows([...rows, { id: Date.now(), quantity: 0, percent: 100, price: 0 }])
  }

  const updateRow = (id: number, field: string, value: number) => {
    const newRows = rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    )
    setRows(newRows)
    calculateTotals(newRows)
  }

  const calculateTotals = (rowsData: any[]) => {
    let withoutVAT = 0
    rowsData.forEach(row => {
      const total = row.quantity * (row.percent / 100) * row.price
      withoutVAT += total
    })
    const vat = withoutVAT * 0.18
    const withVAT = withoutVAT + vat
    
    setTotals({ withoutVAT, vat, withVAT })
  }

  return (
    <div className="container">
      <div className="quote-header">
        <h1>💰 יצירת הצעת מחיר מקצועית</h1>
        <p>מלא את הפרטים הבאים כדי ליצור הצעת מחיר מקצועית ומדויקת</p>
        <div className="quote-badges">
          <span className="badge">⚡ מהיר</span>
          <span className="badge">🎯 מדויק</span>
          <span className="badge">💼 מקצועי</span>
        </div>
      </div>
      
      <div className="quote-controls">
        <div className="controls-left">
          <button className="btn add-btn" onClick={addRow}>
            <span className="btn-icon">➕</span>
            <span>הוסף שורה חדשה</span>
          </button>
          <button className="btn duplicate-btn" onClick={() => {
            const lastRow = rows[rows.length - 1]
            addRow()
            setTimeout(() => {
              updateRow(rows[rows.length - 1].id, 'quantity', lastRow.quantity)
              updateRow(rows[rows.length - 1].id, 'percent', lastRow.percent)
              updateRow(rows[rows.length - 1].id, 'price', lastRow.price)
            }, 100)
          }}>
            <span className="btn-icon">📋</span>
            <span>שכפל שורה</span>
          </button>
        </div>
        <div className="controls-right">
          <div className="row-count">
            <span className="count-number">{rows.length}</span>
            <span className="count-label">שורות</span>
          </div>
        </div>
      </div>
      
      <div className="quote-table-section">
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
              {rows.map((row, index) => {
                const rowTotal = row.quantity * (row.percent / 100) * row.price
                const rowVAT = rowTotal * 0.18
                const rowWithVAT = rowTotal + rowVAT
                
                return (
                  <tr key={row.id} className="data-row">
                    <td>
                      <select className="form-select" defaultValue="דירה">
                        <option value="דירה">🏠 דירה</option>
                        <option value="בית">🏡 בית פרטי</option>
                        <option value="משרד">🏢 משרד</option>
                        <option value="חנות">🏪 חנות</option>
                        <option value="מחסן">🏭 מחסן</option>
                      </select>
                    </td>
                    <td>
                      <select className="form-select" defaultValue="הריסה">
                        <option value="הריסה">🔨 הריסה</option>
                        <option value="בניה">🏗️ בניה</option>
                        <option value="צבע">🎨 צבע</option>
                        <option value="ריצוף">🔲 ריצוף</option>
                        <option value="אינסטלציה">🚿 אינסטלציה</option>
                        <option value="חשמל">⚡ חשמל</option>
                        <option value="גבס">🧱 גבס</option>
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
                        onChange={(e) => updateRow(row.id, 'quantity', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td>
                      <select 
                        className="form-select"
                        value={row.percent}
                        onChange={(e) => updateRow(row.id, 'percent', parseFloat(e.target.value))}
                      >
                        <option value="100">100%</option>
                        <option value="90">90%</option>
                        <option value="80">80%</option>
                        <option value="70">70%</option>
                        <option value="60">60%</option>
                        <option value="50">50%</option>
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
                        onChange={(e) => updateRow(row.id, 'price', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td className="result-cell">
                      <span className="amount">{rowTotal.toFixed(2)} ₪</span>
                    </td>
                    <td className="result-cell">
                      <span className="amount">{rowVAT.toFixed(2)} ₪</span>
                    </td>
                    <td className="result-cell total-cell">
                      <span className="amount total-amount">{rowWithVAT.toFixed(2)} ₪</span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="btn delete-btn"
                        onClick={() => {
                          if (rows.length > 1) {
                            setRows(rows.filter(r => r.id !== row.id))
                            calculateTotals(rows.filter(r => r.id !== row.id))
                          }
                        }}
                        disabled={rows.length === 1}
                        title="מחק שורה"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="summary-section">
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
      
      <div className="quote-actions">
        <div className="action-buttons">
          <button className="btn print-btn" onClick={() => window.print()}>
            <span className="btn-icon">🖨️</span>
            <span>הדפס הצעה</span>
          </button>
          <button className="btn email-btn" onClick={() => alert('שליחת הצעה באימייל...')}>
            <span className="btn-icon">📧</span>
            <span>שלח באימייל</span>
          </button>
          <button className="btn save-btn" onClick={() => alert('הצעת המחיר נשמרה בהצלחה!')}>
            <span className="btn-icon">💾</span>
            <span>שמור הצעה</span>
          </button>
        </div>
        
        <div className="reset-section">
          <button className="btn reset-btn" onClick={() => {
            if (confirm('האם אתה בטוח שברצונך לאפס את כל הנתונים?')) {
              window.location.reload()
            }
          }}>
            <span className="btn-icon">🔄</span>
            <span>איפוס מלא</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quote
