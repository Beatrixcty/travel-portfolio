import { useState, useEffect } from 'react'
import { countries } from '../data/countries'
import CountryCard from '../components/CountryCard'
import Footer from '../components/Footer'
import './Countries.css'

const continents = ['All', ...new Set(countries.filter(c => c.visited).map(c => c.continent))]

function Countries() {
  const [selected, setSelected] = useState('All')
  const [query, setQuery] = useState('')
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filtered = countries
    .filter(c => c.visited && (selected === 'All' || c.continent === selected))
    .filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="countries-page">
      <div className="countries-header">
        <div className="countries-controls">
          <input
            className="country-search"
            type="text"
            placeholder="Search countries..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="continent-filters">
            {continents.map(continent => (
              <button
                key={continent}
                className={`filter-btn ${selected === continent ? 'active' : ''}`}
                onClick={() => setSelected(continent)}
              >
                {continent}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="countries-grid">
        {filtered.length > 0 ? (
          filtered.map(country => (
            <CountryCard key={country.id} country={country} />
          ))
        ) : (
          <p className="no-results">No countries found for "{query}"</p>
        )}
      </div>
      <Footer />
      {showTopBtn && (
        <button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑ Top
        </button>
      )}
    </div>
  )
}

export default Countries
