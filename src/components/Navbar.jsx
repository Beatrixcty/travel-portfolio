import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">

      {/* Logo — clicking takes you home */}
      <Link to="/" className="navbar-logo">
        ✈️ Travel Scrapbook
      </Link>

      {/* Desktop links */}
      <ul className="navbar-links">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/countries">Countries</Link></li>
        <li><Link to="/map">Map</Link></li>
      </ul>

      {/* Hamburger button */}
      <button
        className="navbar-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul className="navbar-mobile">
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/countries" onClick={() => setMenuOpen(false)}>Countries</Link></li>
          <li><Link to="/map" onClick={() => setMenuOpen(false)}>Map</Link></li>
        </ul>
      )}

    </nav>
  )
}

export default Navbar
