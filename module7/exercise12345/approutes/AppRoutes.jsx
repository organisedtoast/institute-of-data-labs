import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Login2 from '../components/Login2'
import BitcoinRates2reducer from '../components/BitcoinRates2reducer'
import CustomCard from '../components/CustomCard'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login2 />} />
      <Route path="/bitcoin" element={<BitcoinRates2reducer />} />
      <Route path="/customcard" element={<CustomCard />} /> 
    </Routes>
  )
}
