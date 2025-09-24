import { useState, Suspense } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LazyHome, LazyQuote, LazyProjects, LazyContact, LazyInvoice, LazyRights } from './components/LazyWrapper'
import { useToast, ToastContainer } from './hooks/useToast'
import './index.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { toasts, removeToast } = useToast()

  const closeMenu = () => setMenuOpen(false)


  return (
    <AppProvider>
      <ErrorBoundary>
        <Router>
          <div className="app">
            <a href="#main-content" className="skip-link">
              דלג לתוכן הראשי
            </a>
            <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
              <button 
                className="hamburger" 
                aria-label="פתח תפריט" 
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <div className="nav-links" onClick={closeMenu}>
                <Link to="/" aria-label="עמוד הבית">🏠 בית</Link>
                <Link to="/projects" aria-label="פרויקטים">📸 פרויקטים</Link>
                <Link to="/quote" aria-label="הצעת מחיר">💰 הצעת מחיר</Link>
                <Link to="/invoice" aria-label="חשבונית">🧾 חשבונית</Link>
                <Link to="/contact" aria-label="צור קשר">📞 צור קשר</Link>
                <Link to="/rights" aria-label="זכויות">⚖️ זכויות</Link>
              </div>
            </nav>
            
            <main id="main-content" className="main-content" role="main">
              <Suspense fallback={
                <div className="loading-container">
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>טוען עמוד...</p>
                  </div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<LazyHome />} />
                  <Route path="/projects" element={<LazyProjects />} />
                  <Route path="/quote" element={<LazyQuote />} />
                  <Route path="/invoice" element={<LazyInvoice />} />
                  <Route path="/contact" element={<LazyContact />} />
                  <Route path="/rights" element={<LazyRights />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
        
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </ErrorBoundary>
    </AppProvider>
  )
}

export default App