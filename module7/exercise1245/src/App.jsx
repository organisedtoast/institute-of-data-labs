import { useState } from 'react'
import './App.css'
import BitcoinRates from '../components/BitcoinRates'
import BitcoinRates2 from '../components/BitcoinRates2'

function App() {
  const [count, setCount] = useState(0) //

  return (
    <>
      <BitcoinRates />
      <BitcoinRates2 />
    </>
  )
}

export default App
