import { useState, useEffect } from 'react'
import './Stats.css'
import { countries } from '../data/countries'

function AnimatedNumber({ target }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = 0
  const duration = 1500
const interval = 150
    const steps = duration / interval

    const timer = setInterval(() => {
      start++
      const progress = start / steps
      if (progress >= 1) {
        setDisplay(target)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(progress * target))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [target])

  return <span className="stat-number">{display}</span>
}

function Stats() {
const countryCount = countries.filter(c => c.visited).length
const tripCount = countries.reduce((sum, c) => sum + c.tripCount, 0)
const yearsCount = new Date().getFullYear() - 2019

const stats = [
  { number: countryCount, label: 'Countries Visited' },
  { number: tripCount, label: 'Trips Together' },
  { number: yearsCount, label: 'Years of Adventure' },
]

  return (
    <section className="stats">
      {stats.map((stat, index) => (
        <div className="stat-item" key={index}>
          <AnimatedNumber target={stat.number} />
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </section>
  )
}

export default Stats
