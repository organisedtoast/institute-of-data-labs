import { useState } from 'react'
import './App.css'
import BitcoinRates from '../components/BitcoinRates'
import BitcoinRates2 from '../components/BitcoinRates2'
import BitcoinRates2reducer from '../components/BitcoinRates2reducer'

function App() {
  const [count, setCount] = useState(0) //

  return (
    <>
      <BitcoinRates />

      <BitcoinRates2 />

      <BitcoinRates2reducer />
    </>
  )
}

export default App
