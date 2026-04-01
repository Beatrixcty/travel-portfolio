// src/components/AboutMe.jsx
import { useNavigate } from 'react-router-dom'
import './AboutMe.css'

function AboutMe() {
  const navigate = useNavigate()
  return (
    <section className="aboutMe">
      <div className="aboutMe-content">
        <p className="aboutMe-tag"> Digital Nomad Life</p>
        <h1>B & H</h1>
        <p className="aboutMe-subtitle">
          Two passports, countless adventures. This is my travel scrapbook<br/>
          a collection of places, memories, and stories from around the world.
        </p>
        <button className="aboutMe-btn" onClick={() => navigate('/countries')}>Let Me Show You My World</button>
      </div>
    </section>
  )
}

export default AboutMe
