import { useState } from 'react'
import './App.css'
import NavBar from '../components/NavBar'
import AppRoutes from '..approutes/AppRoutes'
import BitcoinRates from '../components/BitcoinRates'
import BitcoinRates2 from '../components/BitcoinRates2'
import BitcoinRates2reducer from '../components/BitcoinRates2reducer'
import { EmojiProvider } from '../contexts/EmojiContext'

function App() {
  const [count, setCount] = useState(0) //

  return (
    <EmojiProvider>
      <NavBar />
      <AppRoutes />

      <BitcoinRates2reducer />

      <BitcoinRates2 />

      <BitcoinRates />

    </EmojiProvider>
  )
}

export default App
