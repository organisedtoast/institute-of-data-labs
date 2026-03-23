'use client' // client component, not server rendered

import { useContext } from 'react'

import EmojiContext from '../contexts/EmojiContext'

function Emoji() {


  const { isHappy, handleChangeMood } = useContext(EmojiContext)

  return (
    <>
      <h2>Man Utd Fan Reaction to Bitcoin Price</h2>
      <p className = "emoji-text"  >{isHappy ? '😀' : '😡'}</p>
      <button onClick={handleChangeMood}>Toggle change in BTC price</button>
    </>
  )
}

export default Emoji
