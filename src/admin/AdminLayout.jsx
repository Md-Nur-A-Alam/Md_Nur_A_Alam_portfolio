import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import ThemeSwitcher from '../components/ui/ThemeSwitcher';
import { FiGrid, FiCode, FiBriefcase, FiTool, FiBookOpen, FiMail, FiSettings, FiExternalLink, FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard',    path: '/admin/dashboard',    icon: <FiGrid /> },
  { label: 'Projects',     path: '/admin/projects',     icon: <FiCode /> },
  { label: 'Experience',   path: '/admin/experience',   icon: <FiBriefcase /> },
  { label: 'Skills',       path: '/admin/skills',       icon: <FiTool /> },
  { label: 'Publications', path: '/admin/publications', icon: <FiBookOpen /> },
  { label: 'Messages',     path: '/admin/messages',     icon: <FiMail /> },
  { label: 'Settings',     path: '/admin/settings',     icon: <FiSettings /> },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!import.meta.env.VITE_FB_API_KEY) return;
    const q = query(collection(db, 'messages'), where('read', '==', false));
    return onSnapshot(q, snap => setUnread(snap.size));
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)', color: 'var(--text-base)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full flex flex-col border-r border-[var(--border)] z-50 transition-all duration-300 ${collapsed ? 'w-[56px]' : 'w-[260px]'}`}
        style={{ background: 'var(--bg-secondary)' }}
      >
        {/* Top logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-[var(--border)]">
          {!collapsed && (
            <div>
              <div className="font-['Cormorant_Garamond'] italic text-[22px] text-[var(--accent)]">N·A</div>
              <div className="font-['DM_Mono'] text-[9px] text-[var(--text-muted)] tracking-widest uppercase">Admin Panel</div>
            </div>
          )}
          <button onClick={() => setCollapsed(v => !v)} className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors p-1" data-cursor="hover">
            {collapsed ? <FiMenu /> : <FiX />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 font-['DM_Mono'] text-[12px] transition-all duration-200 relative ${
                isActive
                  ? 'text-[var(--accent)] bg-[var(--accent-glow)] border-r-2 border-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--bg-elevated)]'
              }`}
              title={collapsed ? item.label : undefined}
              data-cursor="hover"
            >
              <span className="flex-shrink-0 text-[16px]">{item.icon}</span>
              {!collapsed && <span className="flex-1 uppercase tracking-wider">{item.label}</span>}
              {!collapsed && item.label === 'Messages' && unread > 0 && (
                <span className="bg-[var(--accent)] text-[var(--bg-base)] rounded-full text-[10px] font-bold px-1.5 py-0.5 min-w-[18px] text-center">
                  {unread}
                </span>
              )}
              {collapsed && item.label === 'Messages' && unread > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--accent)]" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className={`border-t border-[var(--border)] p-4 space-y-3`}>
          {!collapsed && <ThemeSwitcher />}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] font-['DM_Mono'] text-[11px] transition-colors"
            data-cursor="hover"
          >
            <FiExternalLink />
            {!collapsed && 'View Site →'}
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 font-['DM_Mono'] text-[11px] transition-colors"
            data-cursor="hover"
          >
            <span>⏻</span>
            {!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'ml-[56px]' : 'ml-[260px]'}`}>
        {/* Top bar */}
        <header className="h-16 border-b border-[var(--border)] flex items-center justify-between px-8 sticky top-0 z-40" style={{ background: 'var(--bg-secondary)' }}>
          <div className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)]">
            <span className="text-[var(--text-faint)]">Admin /</span>
            <span className="text-[var(--text-base)] ml-1">Dashboard</span>
          </div>
          <div className="font-['DM_Mono'] text-[11px] text-[var(--text-faint)]">
            {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            {' · '}
            {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
