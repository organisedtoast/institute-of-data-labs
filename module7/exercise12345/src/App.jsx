import { useState } from 'react'
import './App.css'
import NavBar2 from '../components/NavBar2'
import AppRoutes from '../approutes/AppRoutes'
import { EmojiProvider } from '../contexts/EmojiContext'

import { ThemeProvider } from "@mui/material/styles";
import { tealTheme } from './themes/tealTheme';

function App() {
  const [count, setCount] = useState(0) //

  return (

      <ThemeProvider theme={tealTheme}>
        <EmojiProvider>
          <NavBar2 />
          <AppRoutes />
        </EmojiProvider>
      </ThemeProvider>
  )
}

export default App