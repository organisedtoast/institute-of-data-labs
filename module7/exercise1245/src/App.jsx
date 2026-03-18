import { useState } from 'react'
import './App.css'
import BitcoinRates from '../components/BitcoinRates'

function App() {
  const [count, setCount] = useState(0) //

  return (
    <>
      <BitcoinRates />
    </>
  )
}

export default App
