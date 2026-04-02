import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

import { FiMail, FiTrash2, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const toastStyle = { style: { background: 'var(--bg-elevated)', color: 'var(--text-base)', border: '1px solid var(--border)' } };

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!import.meta.env.VITE_FB_API_KEY) { setMessages([]); return; }
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  const filtered = filter === 'All' ? messages : messages.filter(m => filter === 'Unread' ? !m.read : m.read);

  const markRead = async (id) => {
    await updateDoc(doc(db, 'messages', id), { read: true });
    toast.success('Marked as read', toastStyle);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await deleteDoc(doc(db, 'messages', id));
    setSelected(null);
    toast.success('Deleted', toastStyle);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-[32px] text-[var(--text-base)]">Messages</h2>
          <p className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)]">{messages.filter(m => !m.read).length} unread</p>
        </div>
        <div className="flex gap-2">
          {['All', 'Unread', 'Read'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`font-['DM_Mono'] text-[11px] px-4 py-2 rounded transition-all ${filter === f ? 'bg-[var(--accent)] text-[var(--bg-base)] font-bold' : 'border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-bright)]'}`}
              data-cursor="hover">{f}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-8 text-center font-['DM_Mono'] text-[13px] text-[var(--text-faint)]">
              No messages
            </div>
          )}
          {filtered.map(msg => (
            <button key={msg.id} onClick={() => setSelected(msg)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                selected?.id === msg.id ? 'border-[var(--accent)] bg-[var(--accent-glow)]' :
                !msg.read ? 'border-[var(--border-bright)] bg-[var(--bg-elevated)]' : 'border-[var(--border)] bg-[var(--bg-elevated)]'
              } hover:border-[var(--border-bright)]`}
              data-cursor="hover"
            >
              {!msg.read && <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--accent)] flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-['DM_Mono'] text-[13px] text-[var(--text-base)] font-medium truncate">{msg.name}</span>
                  <span className="font-['DM_Mono'] text-[10px] text-[var(--text-faint)] flex-shrink-0">
                    {msg.createdAt?.toDate?.()?.toLocaleDateString() || 'Now'}
                  </span>
                </div>
                <div className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)] truncate">{msg.subject}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        {selected ? (
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="font-['Cormorant_Garamond'] font-semibold text-[22px] text-[var(--text-base)]">{selected.subject}</h3>
                <div className="font-['DM_Mono'] text-[12px] text-[var(--accent)]">From: {selected.name} &lt;{selected.email}&gt;</div>
              </div>
              <div className="flex gap-2">
                {!selected.read && (
                  <button onClick={() => markRead(selected.id)} className="text-[var(--text-muted)] hover:text-green-400 transition-colors" title="Mark as read" data-cursor="hover"><FiCheck /></button>
                )}
                <button onClick={() => handleDelete(selected.id)} className="text-[var(--text-muted)] hover:text-red-400 transition-colors" data-cursor="hover"><FiTrash2 /></button>
              </div>
            </div>
            <p className="font-['DM_Mono'] text-[13px] text-[var(--text-muted)] leading-relaxed whitespace-pre-wrap mb-5">{selected.message}</p>
            <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
              className="inline-flex items-center gap-2 font-['DM_Mono'] text-[12px] px-4 py-2 border border-[var(--border-bright)] text-[var(--accent)] rounded hover:bg-[var(--accent)] hover:text-[var(--bg-base)] transition-all"
              data-cursor="hover">
              <FiMail /> Reply via Email
            </a>
          </div>
        ) : (
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-8 flex items-center justify-center text-[var(--text-faint)] font-['DM_Mono'] text-[13px]">
            Select a message to view
          </div>
        )}
      </div>
    </div>
  );
}
