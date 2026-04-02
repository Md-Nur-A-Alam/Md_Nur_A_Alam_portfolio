import { motion } from 'framer-motion';
import { FiMoon, FiSun, FiTerminal } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="flex gap-2 p-1 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]">
      <ThemeButton
        active={theme === 'dark-luxe'}
        onClick={() => changeTheme('dark-luxe')}
        icon={<FiMoon />}
        label="Dark"
      />
      <ThemeButton
        active={theme === 'light-pearl'}
        onClick={() => changeTheme('light-pearl')}
        icon={<FiSun />}
        label="Light"
      />
      <ThemeButton
        active={theme === 'dev-saturated'}
        onClick={() => changeTheme('dev-saturated')}
        icon={<FiTerminal />}
        label="Dev"
      />
    </div>
  );
}

const ThemeButton = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${
        active ? 'text-[var(--bg-base)]' : 'text-[var(--text-muted)] hover:text-[var(--accent)]'
      }`}
      title={label}
      aria-label={`Switch to ${label} theme`}
      data-cursor="hover"
    >
      {active && (
        <motion.div
          layoutId="activeTheme"
          className="absolute inset-0 bg-[var(--accent)] rounded-full shadow-[0_0_15px_var(--accent-glow)]"
          initial={false}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      <div className="relative z-10 flex items-center justify-center">
        {icon}
      </div>
    </button>
  );
};
