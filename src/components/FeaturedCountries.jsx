// src/components/FeaturedCountries.jsx
import { countries } from '../data/countries'
import CountryCard from './CountryCard'
import './FeaturedCountries.css'

function FeaturedCountries() {
  const featured = countries.filter(country => country.featured === true)

  return (
    <section className="featured-countries" id="countries">
      <h2>Highlights</h2>
      <div className="countries-grid">
        {featured.map(country => (
          <CountryCard key={country.id} country={country} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedCountries
