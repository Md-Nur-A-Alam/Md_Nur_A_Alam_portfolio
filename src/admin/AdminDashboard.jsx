import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, doc, setDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useData } from '../context/DataContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] p-3 rounded font-['DM_Mono'] text-[12px]">
        <p className="text-[var(--text-muted)] mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }}>{entry.name}: {entry.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const { projects, publications } = useData();
  const [analytics, setAnalytics] = useState([]);
  const [messages, setMessages] = useState([]);
  const [unread, setUnread] = useState(0);
  const [selectedMsg, setSelectedMsg] = useState(null);

  // Track page view
  useEffect(() => {
    if (!import.meta.env.VITE_FB_API_KEY) return;
    const today = new Date().toISOString().split('T')[0];
    const ref = doc(db, 'analytics', today);
    setDoc(ref, { pageViews: increment(1), date: today }, { merge: true }).catch(() => {});
  }, []);

  // Fetch analytics
  useEffect(() => {
    if (!import.meta.env.VITE_FB_API_KEY) return;
    const q = query(collection(db, 'analytics'), orderBy('date', 'asc'));
    return onSnapshot(q, snap => {
      setAnalytics(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    });
  }, []);

  // Fetch messages
  useEffect(() => {
    if (!import.meta.env.VITE_FB_API_KEY) return;
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMessages(msgs);
      setUnread(msgs.filter(m => !m.read).length);
    });
  }, []);

  const last30 = analytics.slice(-30);

  const statCards = [
    { label: 'Total Projects', value: projects.length, color: 'var(--accent)' },
    { label: 'Publications', value: publications.length, color: 'var(--accent)' },
    { label: 'Total Messages', value: messages.length, color: 'var(--accent)' },
    { label: 'Unread Messages', value: unread, color: unread > 0 ? '#ef4444' : 'var(--accent)' },
  ];

  const chartConfig = {
    style: { background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '8px', padding: '20px' }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-['Cormorant_Garamond'] font-semibold text-[36px] text-[var(--text-base)] mb-1">Dashboard</h1>
        <p className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)]">Analytics & site overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, i) => (
          <div key={i} className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6">
            <div className="font-['Cormorant_Garamond'] font-semibold text-[44px] leading-none mb-2" style={{ color: card.color }}>
              {card.value}
            </div>
            <div className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] uppercase tracking-[0.1em]">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Views */}
        <div style={chartConfig.style}>
          <h3 className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)] uppercase tracking-wider mb-6">Page Views — Last 30 Days</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={last30}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: 'var(--text-faint)' }} tickFormatter={d => d?.slice(5)} />
              <YAxis tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: 'var(--text-faint)' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="pageViews" name="Views" stroke="var(--accent)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: 'var(--accent)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Messages over time */}
        <div style={chartConfig.style}>
          <h3 className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)] uppercase tracking-wider mb-6">Messages — Last 30 Days</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={last30}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: 'var(--text-faint)' }} tickFormatter={d => d?.slice(5)} />
              <YAxis tick={{ fontFamily: 'DM Mono', fontSize: 10, fill: 'var(--text-faint)' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="contactSubmissions" name="Messages" fill="var(--accent)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent messages */}
      <div style={chartConfig.style}>
        <h3 className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)] uppercase tracking-wider mb-6">Recent Messages</h3>
        {messages.length === 0 ? (
          <p className="font-['DM_Mono'] text-[13px] text-[var(--text-faint)] text-center py-8">No messages yet</p>
        ) : (
          <div className="space-y-2">
            {messages.slice(0, 5).map(msg => (
              <button
                key={msg.id}
                onClick={() => setSelectedMsg(selectedMsg?.id === msg.id ? null : msg)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center gap-4 ${
                  !msg.read ? 'border-[var(--accent)] bg-[var(--accent-glow)]' : 'border-[var(--border)] bg-[var(--bg-base)]'
                } hover:border-[var(--border-bright)]`}
                data-cursor="hover"
              >
                {!msg.read && <span className="w-2 h-2 rounded-full bg-[var(--accent)] flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="font-['DM_Mono'] text-[13px] text-[var(--text-base)] truncate">{msg.name} — {msg.subject}</div>
                  <div className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] truncate">{msg.email}</div>
                </div>
                <div className="font-['DM_Mono'] text-[10px] text-[var(--text-faint)] flex-shrink-0">
                  {msg.createdAt?.toDate?.()?.toLocaleDateString() || 'Just now'}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Message detail */}
        {selectedMsg && (
          <div className="mt-4 p-5 rounded-lg border border-[var(--border-bright)] bg-[var(--bg-base)]">
            <div className="font-['Cormorant_Garamond'] font-semibold text-[18px] text-[var(--text-base)] mb-1">{selectedMsg.subject}</div>
            <div className="font-['DM_Mono'] text-[12px] text-[var(--accent)] mb-4">From: {selectedMsg.name} &lt;{selectedMsg.email}&gt;</div>
            <p className="font-['DM_Mono'] text-[13px] text-[var(--text-muted)] leading-relaxed whitespace-pre-wrap">{selectedMsg.message}</p>
            <a
              href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`}
              className="inline-flex items-center gap-2 mt-4 font-['DM_Mono'] text-[12px] px-4 py-2 border border-[var(--border-bright)] text-[var(--accent)] rounded hover:bg-[var(--accent)] hover:text-[var(--bg-base)] transition-all"
              data-cursor="hover"
            >
              Reply via Email →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
