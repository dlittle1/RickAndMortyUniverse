import Navbar from './components/Navbar'
import Home from './pages/Home'
import Characters from './pages/Characters'
import Locations from './pages/Locations'
import Location from './pages/Location'
import Episodes from './pages/Episodes'
import LocationUnknown from './pages/LocationUnknown'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Character from './pages/Character'
import Episode from './pages/Episode'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/characters' element={<Characters />} />
        <Route path='/characters/:characterId' element={<Character />} />
        <Route path='/locations' element={<Locations />} />
        <Route path='/locations/:locationId' element={<Location />} />
        <Route path='/locations/0' element={<LocationUnknown />} />
        <Route path='/episodes' element={<Episodes />} />
        <Route path='/episodes/:episodeId' element={<Episode />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
