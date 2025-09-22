import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import Quote from './pages/Quote'
import Invoice from './pages/Invoice'
import Rights from './pages/Rights'
import './styles/common.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <Router>
      <div className="app">
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <button className="hamburger" aria-label="פתח תפריט" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="nav-links" onClick={closeMenu}>
            <Link to="/">🏠 בית</Link>
            <Link to="/projects">📸 פרויקטים</Link>
            <Link to="/quote">💰 הצעת מחיר</Link>
            <Link to="/invoice">🧾 חשבונית</Link>
            <Link to="/contact">📞 צור קשר</Link>
            <Link to="/rights">⚖️ זכויות</Link>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/rights" element={<Rights />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App