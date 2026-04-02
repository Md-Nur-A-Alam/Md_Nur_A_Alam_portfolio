import { useTheme } from '../../context/ThemeContext';
import { FiMoon, FiSun, FiTerminal } from 'react-icons/fi';

const icons = {
  'dark-luxe':      { icon: FiMoon,     label: 'Dark' },
  'light-pearl':    { icon: FiSun,      label: 'Light' },
  'dev-saturated':  { icon: FiTerminal, label: 'Dev' },
};

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Object.entries(icons).map(([key, { icon: Icon, label }]) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          title={label}
          data-cursor="hover"
          style={{
            width: 32, height: 32,
            borderRadius: 6,
            border: `1px solid ${theme === key ? 'var(--border-bright)' : 'var(--border)'}`,
            background: theme === key ? 'var(--accent-glow)' : 'transparent',
            color: theme === key ? 'var(--accent)' : 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.25s ease',
            cursor: 'none',
          }}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}
