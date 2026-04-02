import { createContext, useContext, useState, useEffect } from 'react';

const THEMES = ['dark-luxe', 'light-pearl', 'dev-saturated'];
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('nur_theme') || 'dark-luxe'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nur_theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
