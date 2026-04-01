import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Map from './pages/Map'
import Countries from './pages/Countries'
import CountryPage from './pages/CountryPage'

import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<Map />}/>
          <Route path="/countries" element={<Countries />}/>
          <Route path="/countries/:id" element={<CountryPage />}/>
        </Routes>
      </main>
    </>
  )
}

export default App
