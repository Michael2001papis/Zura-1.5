import React from 'react'

const Invoice: React.FC = () => {
  return (
    <div className="container">
      <h1>פנקס חשבונית/קבלות לעסק</h1>
      <p>נא למלא את הפרטים הבאים</p>
      
      <div className="invoice-info">
        <div className="form-group">
          <label htmlFor="invoiceNumber">מספר חשבונית:</label>
          <input type="text" id="invoiceNumber" placeholder="הכנס מספר חשבונית" />
        </div>

        <div className="form-group">
          <label htmlFor="recipient">לכבוד:</label>
          <input type="text" id="recipient" placeholder="שם מקבל החשבונית" />
        </div>

        <div className="form-group">
          <label htmlFor="invoiceDate">תאריך:</label>
          <input type="text" id="invoiceDate" placeholder="הכנס תאריך" />
        </div>

        <div className="form-group">
          <label htmlFor="address">כתובת:</label>
          <input type="text" id="address" placeholder="הכנס כתובת" />
        </div>

        <div className="form-group">
          <label htmlFor="details">פרטים:</label>
          <textarea id="details" rows={3} placeholder="הכנס פרטים"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="totalBeforeVAT">סה״כ לפני מע״מ:</label>
          <input type="text" id="totalBeforeVAT" placeholder="הכנס סכום" />
        </div>

        <div className="form-group">
          <label htmlFor="vatAmount">מע״מ (18%):</label>
          <input type="text" id="vatAmount" placeholder="הכנס סכום מע״מ" />
        </div>

        <div className="form-group">
          <label htmlFor="totalWithVAT">סה״כ כולל מע״מ:</label>
          <input type="text" id="totalWithVAT" placeholder="הכנס סכום כולל" />
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">אופן התשלום:</label>
          <input type="text" id="paymentMethod" placeholder="מזומן, העברה בנקאית, ש״ק וכו׳" />
        </div>
      </div>

      <div className="business-info">
        <h2>פרטי העסק</h2>
        <p><strong>שם העסק:</strong> מ.פ. פרויקטים</p>
        <p><strong>כתובת:</strong> גולדברג הנדבן 14, ראשון לציון</p>
        <p><strong>טלפון:</strong> 054-582-0008</p>
        <p><strong>אימייל:</strong> Zurapapismedov@gmail.com</p>
      </div>
      
      <div className="buttons">
        <button className="btn print-btn" onClick={() => window.print()}>הדפס</button>
        <button className="btn reset-btn" onClick={() => window.location.reload()}>איפוס</button>
      </div>
    </div>
  )
}

export default Invoice
