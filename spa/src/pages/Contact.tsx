import React from 'react'

const Contact: React.FC = () => {
  return (
    <div className="container">
      <div className="contact-header">
        <h1>📞 צור קשר</h1>
        <p>אנחנו כאן בשבילך! צור איתנו קשר בכל דרך שנוחה לך</p>
      </div>
      
      <div className="contact-info">
        <div className="contact-item phone">
          <div className="contact-icon">📞</div>
          <div className="contact-details">
            <h2>טלפון</h2>
            <p>054-582-0008</p>
            <a href="tel:0545820008" className="contact-link">התקשר עכשיו</a>
          </div>
        </div>
        
        <div className="contact-item email">
          <div className="contact-icon">📧</div>
          <div className="contact-details">
            <h2>אימייל</h2>
            <p>Zurapapismedov@gmail.com</p>
            <a href="mailto:Zurapapismedov@gmail.com" className="contact-link">שלח אימייל</a>
          </div>
        </div>
        
        <div className="contact-item location">
          <div className="contact-icon">📍</div>
          <div className="contact-details">
            <h2>מיקום</h2>
            <p>גולדברג הנדבן 14, ראשון לציון</p>
            <a href="https://maps.google.com/?q=גולדברג הנדבן 14, ראשון לציון" target="_blank" rel="noopener noreferrer" className="contact-link">פתח במפות</a>
          </div>
        </div>
      </div>
      
      <div className="contact-form">
        <h3>💬 שלח לנו הודעה</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">שם מלא</label>
            <input type="text" id="name" name="name" placeholder="הכנס את שמך המלא" />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">טלפון</label>
            <input type="tel" id="phone" name="phone" placeholder="054-XXX-XXXX" />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">אימייל</label>
            <input type="email" id="email" name="email" placeholder="your@email.com" />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">הודעה</label>
            <textarea id="message" name="message" rows={4} placeholder="ספר לנו על הפרויקט שלך..."></textarea>
          </div>
          
          <button type="submit" className="btn submit-btn">📤 שלח הודעה</button>
        </form>
      </div>
      
      <div className="contact-hours">
        <h3>🕒 שעות פעילות</h3>
        <div className="hours-grid">
          <div className="hours-item">
            <span className="day">ראשון - חמישי</span>
            <span className="time">08:00 - 18:00</span>
          </div>
          <div className="hours-item">
            <span className="day">שישי</span>
            <span className="time">08:00 - 14:00</span>
          </div>
          <div className="hours-item">
            <span className="day">שבת</span>
            <span className="time">סגור</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
