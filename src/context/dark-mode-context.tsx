import { DARK_MODE } from 'consts/app';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type InitialState = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const Context = createContext<InitialState | null>(null);

function DarkModeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(DARK_MODE) === DARK_MODE);

  useEffect(() => {
    localStorage.setItem(DARK_MODE, darkMode ? DARK_MODE : '');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return <Context.Provider value={{ darkMode, toggleDarkMode }}>{children}</Context.Provider>;
}

const useDarkModeContext = (): InitialState => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('no context was provided');
  }

  return context;
};

export { useDarkModeContext };
export default DarkModeProvider;
