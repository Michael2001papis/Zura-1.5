import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>G.R. Solutions – מצוינות בשיפוץ הבית</h1>
          <p className="hero-subtitle">מחפש מומחה שיהפוך את החלל שלך? G.R. Solutions כאן כדי להפוך את הרעיונות שלך למציאות.</p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">פרויקטים הושלמו</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">לקוחות מרוצים</span>
            </div>
            <div className="stat">
              <span className="stat-number">5+</span>
              <span className="stat-label">שנות ניסיון</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="floating-card">
            <div className="card-icon">🏠</div>
            <h3>שיפוץ מקצועי</h3>
            <p>עבודות איכותיות ומדויקות</p>
          </div>
          <div className="floating-card">
            <div className="card-icon">⚡</div>
            <h3>זמן קצר</h3>
            <p>השלמה מהירה ויעילה</p>
          </div>
          <div className="floating-card">
            <div className="card-icon">💎</div>
            <h3>חומרים איכותיים</h3>
            <p>רק הטובים ביותר</p>
          </div>
        </div>
      </div>
      
      <div className="features">
        <h2>🎯 מה אנחנו מציעים:</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏠</div>
            <h3>שיפוצים מקיפים</h3>
            <p>דירות, בתים, משרדים ועבודות מותאמות אישית</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>חומרים איכותיים</h3>
            <p>כי עבורנו, איכות היא חובה</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3>זמן מדויק</h3>
            <p>אנחנו מכבדים את הלו"ז שלך</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔨</div>
            <h3>עבודה מקצועית</h3>
            <p>תוצאות מסורות, מדויקות ומושלמות</p>
          </div>
        </div>
      </div>
      
      <div className="testimonials">
        <h2>💬 מה הלקוחות שלנו אומרים:</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"עבודה מדהימה! הבית שלי נראה כמו חדש לגמרי"</p>
            <div className="testimonial-author">- דוד כהן</div>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"מקצועיים, מהירים ואמינים. ממליץ בחום!"</p>
            <div className="testimonial-author">- שרה לוי</div>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"התוצאה עברה את כל הציפיות שלי"</p>
            <div className="testimonial-author">- מיכל רוזן</div>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <div className="cta-content">
          <h2>🚀 מוכן להתחיל?</h2>
          <p>
            אנחנו לעולם לא מתפשרים על פחות – רק תוצאות יוצאות דופן!<br />
            צור קשר עכשיו ובואו ניצור את הבית המושלם שלך!
          </p>
          
          <div className="cta-buttons">
            <Link to="/contact">
              <button className="btn primary-btn">
                <span className="btn-icon">📞</span>
                <span>צור קשר עכשיו!</span>
              </button>
            </Link>
            <Link to="/projects">
              <button className="btn secondary-btn">
                <span className="btn-icon">📸</span>
                <span>צפה בפרויקטים</span>
              </button>
            </Link>
            <Link to="/quote">
              <button className="btn accent-btn">
                <span className="btn-icon">💰</span>
                <span>הצעת מחיר</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
