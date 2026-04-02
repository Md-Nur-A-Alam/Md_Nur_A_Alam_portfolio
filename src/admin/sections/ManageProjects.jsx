import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useForm } from 'react-hook-form';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useData } from '../../context/DataContext';

const toastStyle = { style: { background: 'var(--bg-elevated)', color: 'var(--text-base)', border: '1px solid var(--border)' } };

export default function ManageProjects() {
  const { projects: fallbackProjects } = useData();
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [techTags, setTechTags] = useState([]);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (!import.meta.env.VITE_FB_API_KEY) { setProjects(fallbackProjects); return; }
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    return onSnapshot(q, snap => setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openForm = (project = null) => {
    setEditing(project);
    setShowForm(true);
    if (project) {
      Object.keys(project).forEach(k => setValue(k, project[k]));
      setTechTags(project.tech || []);
    } else {
      reset(); setTechTags([]);
    }
  };

  const closeForm = () => { setShowForm(false); setEditing(null); reset(); setTechTags([]); };

  const addTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && techInput.trim()) {
      e.preventDefault();
      if (!techTags.includes(techInput.trim())) setTechTags(prev => [...prev, techInput.trim()]);
      setTechInput('');
    }
  };

  const onSubmit = async (data) => {
    const payload = { ...data, tech: techTags, order: parseInt(data.order) || projects.length + 1, featured: !!data.featured };
    try {
      if (editing?.id) {
        await updateDoc(doc(db, 'projects', editing.id), payload);
        toast.success('Project updated!', toastStyle);
      } else {
        await addDoc(collection(db, 'projects'), payload);
        toast.success('Project added!', toastStyle);
      }
      closeForm();
    } catch (err) {
      toast.error('Error: ' + err.message, toastStyle);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await deleteDoc(doc(db, 'projects', id));
    toast.success('Deleted', toastStyle);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-['Cormorant_Garamond'] font-semibold text-[32px] text-[var(--text-base)]">Projects</h2>
          <p className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)]">{projects.length} total</p>
        </div>
        <button onClick={() => openForm()} className="flex items-center gap-2 bg-[var(--accent)] text-[var(--bg-base)] font-['DM_Mono'] text-[12px] px-4 py-2.5 rounded hover:opacity-90 transition-opacity" data-cursor="hover">
          <FiPlus /> Add Project
        </button>
      </div>

      {/* Table */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {['#', 'Title', 'Category', 'Status', 'Featured', 'Actions'].map(h => (
                <th key={h} className="px-5 py-3 text-left font-['DM_Mono'] text-[10px] text-[var(--text-muted)] uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-base)] transition-colors">
                <td className="px-5 py-4 font-['DM_Mono'] text-[12px] text-[var(--text-faint)]">{p.order}</td>
                <td className="px-5 py-4 font-['DM_Mono'] text-[13px] text-[var(--text-base)]">{p.title}</td>
                <td className="px-5 py-4 font-['DM_Mono'] text-[12px] text-[var(--text-muted)]">{p.category}</td>
                <td className="px-5 py-4">
                  <span className="font-['DM_Mono'] text-[10px] border border-[var(--border)] text-[var(--text-muted)] px-2 py-0.5 rounded">{p.status}</span>
                </td>
                <td className="px-5 py-4 font-['DM_Mono'] text-[12px] text-[var(--accent)]">{p.featured ? '★' : '—'}</td>
                <td className="px-5 py-4 flex gap-3">
                  <button onClick={() => openForm(p)} className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors" data-cursor="hover"><FiEdit2 /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-[var(--text-muted)] hover:text-red-400 transition-colors" data-cursor="hover"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && closeForm()}>
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl p-8 w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-['Cormorant_Garamond'] font-semibold text-[24px] text-[var(--text-base)]">{editing ? 'Edit' : 'Add'} Project</h3>
              <button onClick={closeForm} className="text-[var(--text-muted)] hover:text-[var(--accent)]" data-cursor="hover"><FiX className="text-xl" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {[
                { name: 'title', label: 'Title', required: true },
                { name: 'category', label: 'Category' },
                { name: 'liveUrl', label: 'Live URL' },
                { name: 'githubUrl', label: 'GitHub URL' },
                { name: 'badge', label: 'Badge text (optional)' },
                { name: 'order', label: 'Order (number)', type: 'number' },
              ].map(f => (
                <div key={f.name}>
                  <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-1.5 uppercase tracking-widest">{f.label}</label>
                  <input type={f.type || 'text'} {...register(f.name, f.required ? { required: `${f.label} is required` } : {})}
                    className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded px-3 py-2.5 font-['DM_Mono'] text-[13px] text-[var(--text-base)] outline-none focus:border-[var(--accent)] transition-colors" />
                  {errors[f.name] && <p className="font-['DM_Mono'] text-[11px] text-red-400 mt-1">{errors[f.name].message}</p>}
                </div>
              ))}

              <div>
                <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-1.5 uppercase tracking-widest">Description</label>
                <textarea rows={3} {...register('description', { required: 'Required' })}
                  className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded px-3 py-2.5 font-['DM_Mono'] text-[13px] text-[var(--text-base)] outline-none focus:border-[var(--accent)] transition-colors resize-none" />
              </div>

              <div>
                <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-1.5 uppercase tracking-widest">Tech Stack (Press Enter to add)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {techTags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 font-['DM_Mono'] text-[11px] bg-[var(--bg-secondary)] border border-[var(--border)] px-2.5 py-1 rounded">
                      {tag} <button type="button" onClick={() => setTechTags(prev => prev.filter(t => t !== tag))} className="text-[var(--text-faint)] hover:text-red-400"><FiX /></button>
                    </span>
                  ))}
                </div>
                <input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={addTag} placeholder="e.g. React, Python..."
                  className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded px-3 py-2.5 font-['DM_Mono'] text-[13px] text-[var(--text-base)] outline-none focus:border-[var(--accent)] transition-colors" />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" {...register('featured')} className="accent-[var(--accent)] w-4 h-4" />
                <label htmlFor="featured" className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)]">Featured project</label>
              </div>

              <div>
                <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-1.5 uppercase tracking-widest">Status</label>
                <select {...register('status')} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded px-3 py-2.5 font-['DM_Mono'] text-[13px] text-[var(--text-base)] outline-none focus:border-[var(--accent)]">
                  {['draft', 'active', 'complete', 'published'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-[var(--accent)] text-[var(--bg-base)] font-['DM_Mono'] text-[13px] font-bold py-3 rounded hover:opacity-90 transition-opacity" data-cursor="hover">
                  {editing ? 'Update' : 'Add'} Project
                </button>
                <button type="button" onClick={closeForm} className="px-6 border border-[var(--border)] text-[var(--text-muted)] font-['DM_Mono'] text-[13px] rounded hover:border-[var(--border-bright)] transition-colors" data-cursor="hover">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
