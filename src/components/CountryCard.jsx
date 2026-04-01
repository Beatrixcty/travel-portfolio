// src/components/CountryCard.jsx
import { Link } from 'react-router-dom'
import './CountryCard.css'

function CountryCard({ country }) {
  return (
    <Link to={`/countries/${country.id}`} className="country-card">
      <img
        src={country.coverImage}
        alt={country.name}
        className="country-card-img"
      />
      <div className="country-card-info">
        <h3>{country.emoji} {country.name}</h3>
        {country.home && <p>🏠 Home</p>}
      </div>
    </Link>
  )
}

export default CountryCard
