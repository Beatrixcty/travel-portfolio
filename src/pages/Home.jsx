// src/pages/Home.jsx
import AboutMe from '../components/AboutMe'
import Stats from '../components/Stats'
import FeaturedCountries from '../components/FeaturedCountries'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <AboutMe />
       <Stats />
      <FeaturedCountries />
      <Footer />
    </div>
  )
}

export default Home
