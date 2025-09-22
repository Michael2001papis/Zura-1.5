import React from 'react'

const Rights: React.FC = () => {
  return (
    <div className="container">
      <header className="main-header">
        <h1>זכויות המפתח</h1>
        <p className="subtitle">Developer Rights & Copyright Information</p>
      </header>

      <section className="developer-info">
        <div className="developer-card">
          <div className="developer-avatar">
            <span>👨‍💻</span>
          </div>
          <div className="developer-details">
            <h2>מיכאל פפיסמדוב</h2>
            <h3>Michael Papismedov</h3>
            <p className="developer-title">מפתח אתרים מקצועי | Professional Web Developer</p>
            <div className="contact-info">
              <p>📧 Zurapapismedov@gmail.com</p>
              <p>📞 054-582-0008</p>
              <p>📍 ראשון לציון, ישראל</p>
            </div>
          </div>
        </div>
      </section>

      <section className="copyright-section">
        <div className="copyright-card">
          <div className="card-header">
            <h2>הצהרת זכויות יוצרים</h2>
            <span className="language-badge">עברית</span>
          </div>

          <div className="warning-box">
            <span>⚠️</span>
            <p>האתר <strong>MPEG | Zura 1.5.v</strong> מוגן בזכויות יוצרים בהתאם לחוקי מדינת ישראל והחוק הבינלאומי.</p>
          </div>

          <div className="rights-grid">
            <div className="right-item">
              <span>©️</span>
              <h3>בעלות על תכנים</h3>
              <p>כל התכנים, העיצובים, הקוד והמידע המופיעים באתר זה הם רכוש פרטי ואין להעתיק, לשכפל, להפיץ או לעשות בהם כל שימוש מסחרי ללא אישור מפורש ובכתב מבעלי האתר.</p>
            </div>

            <div className="right-item">
              <span>🚫</span>
              <h3>איסור העתקה</h3>
              <p>אין להעתיק אתר זה בכל צורה שהיא, כולל העתקה חלקית או מלאה. כל שימוש לא מורשה יגרור נקיטת הליכים משפטיים.</p>
            </div>

            <div className="right-item">
              <span>⚖️</span>
              <h3>אכיפה משפטית</h3>
              <p>כל שימוש לא מורשה יגרור נקיטת הליכים משפטיים בהתאם לחוקי מדינת ישראל והחוק הבינלאומי.</p>
            </div>

            <div className="right-item">
              <span>🔒</span>
              <h3>שימוש פרטי בלבד</h3>
              <p>האתר נועד לשימוש פרטי בלבד. כל כניסה ושימוש באתר מהווים הסכמה מלאה לתנאי השימוש ומדיניות הפרטיות.</p>
            </div>
          </div>

          <div className="project-info">
            <h3>מידע על הפרויקט</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>שם הפרויקט:</strong> MPEG | Zura 1.5.v
              </div>
              <div className="info-item">
                <strong>שנת הקמה:</strong> 2025
              </div>
              <div className="info-item">
                <strong>סטטוס:</strong> בפיתוח
              </div>
              <div className="info-item">
                <strong>גרסה:</strong> 1.5.v
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-left">
            <p>&copy; 2025 כל הזכויות שמורות | MPEG | Zura 1.5.v</p>
            <p>All Rights Reserved | Developed by Michael Papismedov</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Rights
