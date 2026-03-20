import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'
import BitcoinRates2reducer from '../components/BitcoinRates2reducer'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bitcoin" element={<BitcoinRates2reducer />} />
    </Routes>
  )
}
