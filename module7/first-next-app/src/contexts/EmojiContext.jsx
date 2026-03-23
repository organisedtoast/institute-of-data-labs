import { createContext, useState } from 'react';

const EmojiContext = createContext({ isHappy: true, handleChangeMood: () => {} });

export function EmojiProvider({ children }) {
  const [isHappy, setIsHappy] = useState(true);

  const handleChangeMood = () => {
    setIsHappy((currentMood) => !currentMood);
  };

  return (
    <EmojiContext.Provider value={{ isHappy, handleChangeMood }}>
      {children}
    </EmojiContext.Provider>
  );
}

export default EmojiContext;
