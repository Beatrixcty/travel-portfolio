import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { countries } from '../data/countries'
import Footer from '../components/Footer'
import './CountryPage.css'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

// Fetches all city images at once so the lightbox can use them too
function useCityImages(cities) {
  const [images, setImages] = useState(() =>
    Object.fromEntries(cities.map(c => [c.name, c.coverImage || null]))
  )
  useEffect(() => {
    cities.forEach(city => {
      if (city.coverImage) return
      const title = encodeURIComponent(city.name)
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          const src = data?.originalimage?.source || data?.thumbnail?.source
            || `https://picsum.photos/seed/${encodeURIComponent(city.name)}/800/500`
          setImages(prev => ({ ...prev, [city.name]: src }))
        })
        .catch(() => setImages(prev => ({
          ...prev,
          [city.name]: `https://picsum.photos/seed/${encodeURIComponent(city.name)}/800/500`
        })))
    })
  }, []) // eslint-disable-line
  return images
}

function CityCard({ city, imgSrc }) {
  return (
    <div className="country-city-card">
      {imgSrc ? (
        <img src={imgSrc} alt={city.name} className="country-city-thumb" />
      ) : (
        <div className="country-city-thumb country-city-thumb-placeholder" />
      )}
      <div className="country-city-info">
        <h3>{city.name}</h3>
      </div>
    </div>
  )
}

function CountryPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const country = countries.find((c) => c.id === id)
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cities = country?.cities || []
  const cityImages = useCityImages(cities)

  if (!country) {
    return (
      <div className="country-page-not-found">
        <p>Country not found.</p>
        <button onClick={() => navigate('/countries')}>← Back to Countries</button>
      </div>
    )
  }

  return (
    <div className="country-page">

      {/* ── 1. Hero ── */}
      <div className="country-hero">
        <img src={country.coverImage} alt={country.name} className="country-hero-img" />
        <div className="country-hero-overlay">
          <button className="back-btn" onClick={() => navigate('/countries')}>← All Countries</button>
          <div className="country-hero-title">
            <div className="country-hero-name">
              <span className="country-hero-emoji">{country.emoji}</span>
              <h1>{country.name}</h1>
              {country.home && <span className="country-home-badge">🏠 Home</span>}
            </div>
            {country.vibe && <p className="country-hero-vibe">{country.vibe}</p>}
          </div>
        </div>
      </div>

      <div className="country-content">

        {/* ── 2. Quick Info ── */}
        <motion.section
          className="country-section country-quick-info"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {country.dates && (
            <motion.div className="quick-info-item" variants={fadeUp}>
              <span className="quick-info-label">When</span>
              <span className="quick-info-value">{country.dates}</span>
            </motion.div>
          )}
          {country.totalDuration && (
            <motion.div className="quick-info-item" variants={fadeUp}>
              <span className="quick-info-label">Total time</span>
              <span className="quick-info-value">{country.totalDuration}</span>
            </motion.div>
          )}
          {country.cities && (
            <motion.div className="quick-info-item" variants={fadeUp}>
              <span className="quick-info-label">Cities visited</span>
              <span className="quick-info-value">{country.cities.length}</span>
            </motion.div>
          )}
        </motion.section>

        {/* ── 3. Highlights ── */}
        {country.highlights && (country.highlights.favoriteCity || country.highlights.bestFood || country.highlights.mustDo) && (
          <motion.section
            className="country-section country-highlights"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2>Highlights</h2>
            <motion.div className="highlights-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {country.highlights.favoriteCity && (
                <motion.div className="highlight-item" variants={fadeUp}>
                  <span className="highlight-icon">🏙️</span>
                  <span className="highlight-label">Favourite city</span>
                  <span className="highlight-value">{country.highlights.favoriteCity}</span>
                </motion.div>
              )}
              {country.highlights.bestFood && (
                <motion.div className="highlight-item" variants={fadeUp}>
                  <span className="highlight-icon">🍽️ 😋</span>
                  <span className="highlight-label">Best food</span>
                  <span className="highlight-value">{country.highlights.bestFood}</span>
                </motion.div>
              )}
              {country.highlights.mustDo && (
                <motion.div className="highlight-item" variants={fadeUp}>
                  <span className="highlight-icon">📍📸🚶‍♀️</span>
                  <span className="highlight-label">Must do</span>
                  <span className="highlight-value">{country.highlights.mustDo}</span>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}

        {/* ── 4. Description ── */}
        {country.description && (
          <motion.section
            className="country-section country-description"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2>Description</h2>
            <p className="description-text">{country.description}</p>
          </motion.section>
        )}

        {/* ── 5. Unforgettable Stories ── */}
        {country.unforgettableStories && (
          <motion.section
            className="country-section country-reflection"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2>Unforgettable Stories</h2>
            <div className="reflection-text">
              {country.unforgettableStories.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── 6. Cities ── */}
        {cities.length > 0 && (
          <motion.section
            className="country-section"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2>Cities</h2>
            <motion.div
              className="country-cities-grid"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {cities.map((city) => (
                <motion.div key={city.name} variants={fadeUp}>
                  <CityCard
                    city={city}
                    imgSrc={cityImages[city.name]}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
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

export default CountryPage
