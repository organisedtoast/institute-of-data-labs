import { useState } from 'react'
import './App.css'
import NavBar from '../components/NavBar'
import AppRoutes from '../approutes/AppRoutes'
import { EmojiProvider } from '../contexts/EmojiContext'

function App() {
  const [count, setCount] = useState(0) //

  return (
    <EmojiProvider>
      <NavBar />
      <AppRoutes />
    </EmojiProvider>
  )
}

export default App
