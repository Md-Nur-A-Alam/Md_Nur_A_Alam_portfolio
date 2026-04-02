import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useForm } from 'react-hook-form';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiMonitor, FiCode, FiCpu, FiTool } from 'react-icons/fi';
import toast from 'react-hot-toast';

const toastStyle = { style: { background: 'var(--bg-elevated)', color: 'var(--text-base)', border: '1px solid var(--border)' } };

const iconOptions = [
  { val: 'FiMonitor', icon: <FiMonitor /> },
  { val: 'FiCode', icon: <FiCode /> },
  { val: 'FiCpu', icon: <FiCpu /> },
  { val: 'FiTool', icon: <FiTool /> },
];

export default function ManageSkills() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [skillsList, setSkillsList] = useState([]);

  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (!import.meta.env.VITE_FB_API_KEY) return;
    const q = query(collection(db, 'skills'), orderBy('category', 'asc'));
    return onSnapshot(q, snap => setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  const openForm = (cat = null) => {
    setEditing(cat);
    setShowForm(true);
    if (cat) {
      setValue('category', cat.category);
      setValue('icon', cat.icon);
      setSkillsList(cat.skills || []);
    } else {
      reset(); setSkillsList([]);
    }
  };

  const addSkillRow = () => setSkillsList([...skillsList, { name: '', proficiency: 80 }]);
  const removeSkillRow = (i) => setSkillsList(skillsList.filter((_, idx) => idx !== i));
  const updateSkillRow = (i, field, val) => {
    const next = [...skillsList];
    next[i][field] = field === 'proficiency' ? parseInt(val) : val;
    setSkillsList(next);
  };

  const onSubmit = async (data) => {
    const payload = { ...data, skills: skillsList.filter(s => s.name.trim()) };
    try {
      if (editing?.id) {
        await updateDoc(doc(db, 'skills', editing.id), payload);
        toast.success('Category updated', toastStyle);
      } else {
        await addDoc(collection(db, 'skills'), payload);
        toast.success('Category added', toastStyle);
      }
      setShowForm(false);
    } catch (err) { toast.error(err.message, toastStyle); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-['Cormorant_Garamond'] font-semibold text-[32px] text-[var(--text-base)]">Skills & Expertise</h2>
        <button onClick={() => openForm()} className="flex items-center gap-2 bg-[var(--accent)] text-[var(--bg-base)] font-['DM_Mono'] text-[12px] px-4 py-2 rounded" data-cursor="hover">
          <FiPlus /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(cat => (
          <div key={cat.id} className="bg-[var(--bg-elevated)] border border-[var(--border)] p-5 rounded-xl flex items-start justify-between gap-4">
            <div>
              <div className="font-['DM_Mono'] text-[14px] text-[var(--accent)] font-bold flex items-center gap-2 mb-2">
                {cat.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills?.map(s => (
                  <span key={s.name} className="text-[11px] font-['DM_Mono'] text-[var(--text-muted)] bg-[var(--bg-base)] px-2 py-0.5 rounded border border-[var(--border)]">
                    {s.name} ({s.proficiency}%)
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openForm(cat)} className="text-[var(--text-muted)] hover:text-[var(--accent)]"><FiEdit2 /></button>
              <button onClick={async () => { if(confirm('Delete?')) await deleteDoc(doc(db,'skills',cat.id)) }} className="text-[var(--text-muted)] hover:text-red-400"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl p-8 w-full max-w-xl max-h-[85vh] overflow-y-auto">
            <h3 className="font-['Cormorant_Garamond'] font-semibold text-[24px] mb-6">{editing ? 'Edit' : 'Add'} Category</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-1 uppercase">Category Name</label>
                  <input {...register('category', { required: true })} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded px-3 py-2 font-['DM_Mono'] text-[13px] text-[var(--text-base)] outline-none" />
                </div>
                <div>
                  <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-1 uppercase">Icon</label>
                  <select {...register('icon')} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded px-3 py-2 font-['DM_Mono'] text-[13px] text-[var(--text-base)] outline-none">
                    {iconOptions.map(o => <option key={o.val} value={o.val}>{o.val}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] uppercase">Skills</label>
                  <button type="button" onClick={addSkillRow} className="text-[var(--accent)] font-['DM_Mono'] text-[11px]">+ Add Skill</button>
                </div>
                <div className="space-y-2">
                  {skillsList.map((s, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input placeholder="Skill" value={s.name} onChange={e => updateSkillRow(i, 'name', e.target.value)} className="flex-1 bg-[var(--bg-base)] border border-[var(--border)] rounded px-3 py-1.5 font-['DM_Mono'] text-[12px] text-[var(--text-base)]" />
                      <input type="number" placeholder="%" value={s.proficiency} onChange={e => updateSkillRow(i, 'proficiency', e.target.value)} className="w-16 bg-[var(--bg-base)] border border-[var(--border)] rounded px-3 py-1.5 font-['DM_Mono'] text-[12px] text-[var(--text-base)]" />
                      <button type="button" onClick={() => removeSkillRow(i)} className="text-red-400 p-1"><FiX /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-[var(--accent)] text-[var(--bg-base)] font-['DM_Mono'] text-[13px] font-bold py-3 rounded">Save</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 border border-[var(--border)] text-[var(--text-muted)] rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function ManageExperience() {
  const [exps, setExps] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [techTags, setTechTags] = useState([]);

  useEffect(() => {
    if (!import.meta.env.VITE_FB_API_KEY) return;
    const q = query(collection(db, 'experience'), orderBy('order', 'asc'));
    return onSnapshot(q, snap => setExps(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  const openForm = (e = null) => {
    setEditing(e); setShowForm(true);
    if(e) { Object.keys(e).forEach(k => setValue(k, e[k])); setTechTags(e.tech || []); }
    else { reset(); setTechTags([]); }
  };

  const onSubmit = async (data) => {
    const payload = { ...data, tech: techTags, order: parseInt(data.order), current: !!data.current };
    try {
      if(editing?.id) await updateDoc(doc(db,'experience',editing.id), payload);
      else await addDoc(collection(db,'experience'), payload);
      setShowForm(false);
    } catch(err) { toast.error(err.message, toastStyle); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-['Cormorant_Garamond'] font-semibold text-[32px] text-[var(--text-base)]">Experience</h2>
        <button onClick={() => openForm()} className="bg-[var(--accent)] text-[var(--bg-base)] px-4 py-2 rounded font-['DM_Mono'] text-[12px] flex items-center gap-2"><FiPlus /> Add Exp</button>
      </div>
      <div className="space-y-3">
        {exps.map(e => (
          <div key={e.id} className="bg-[var(--bg-elevated)] border border-[var(--border)] p-5 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-['DM_Mono'] text-[14px] text-[var(--text-base)] font-bold">{e.company}</div>
              <div className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)]">{e.role} · {e.from} - {e.to}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openForm(e)} className="text-[var(--text-muted)] hover:text-[var(--accent)]"><FiEdit2 /></button>
              <button onClick={async () => { if(confirm('Delete?')) await deleteDoc(doc(db,'experience',e.id)) }} className="text-[var(--text-muted)] hover:text-red-400"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl p-8 w-full max-w-xl max-h-[85vh] overflow-y-auto">
             <h3 className="font-['Cormorant_Garamond'] font-semibold text-[24px] mb-6">{editing ? 'Edit' : 'Add'} Experience</h3>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               {['company', 'role', 'from', 'to', 'order'].map(f => (
                 <div key={f}>
                   <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] uppercase mb-1">{f}</label>
                   <input {...register(f)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded px-3 py-2 font-['DM_Mono'] text-[13px] text-[var(--text-base)] outline-none" />
                 </div>
               ))}
               <div className="flex items-center gap-2">
                 <input type="checkbox" id="currentExp" {...register('current')} />
                 <label htmlFor="currentExp" className="font-['DM_Mono'] text-[12px]">Current workplace</label>
               </div>
               <div>
                  <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] uppercase mb-1">Description</label>
                  <textarea {...register('description')} rows={3} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded px-3 py-2 font-['DM_Mono'] text-[13px] text-[var(--text-base)] outline-none resize-none" />
               </div>
               <div className="flex gap-3">
                 <button type="submit" className="flex-1 bg-[var(--accent)] text-[var(--bg-base)] font-['DM_Mono'] text-[13px] font-bold py-3 rounded">Save</button>
                 <button type="button" onClick={() => setShowForm(false)} className="px-6 border border-[var(--border)] text-[var(--text-muted)] rounded">Cancel</button>
               </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function ManagePublications() {
  const [pubs, setPubs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    if (!import.meta.env.VITE_FB_API_KEY) return;
    const q = query(collection(db, 'publications'), orderBy('year', 'desc'));
    return onSnapshot(q, snap => setPubs(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, []);

  const openForm = (p = null) => {
    setEditing(p); setShowForm(true);
    if(p) { Object.keys(p).forEach(k => setValue(k, p[k])); setAuthors(p.authors || []); }
    else { reset(); setAuthors([]); }
  };

  const onSubmit = async (data) => {
    const payload = { ...data, authors };
    try {
      if(editing?.id) await updateDoc(doc(db,'publications',editing.id), payload);
      else await addDoc(collection(db,'publications'), payload);
      setShowForm(false);
    } catch(err) { toast.error(err.message, toastStyle); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-['Cormorant_Garamond'] font-semibold text-[32px] text-[var(--text-base)]">Publications</h2>
        <button onClick={() => openForm()} className="bg-[var(--accent)] text-[var(--bg-base)] px-4 py-2 rounded font-['DM_Mono'] text-[12px] flex items-center gap-2"><FiPlus /> Add Pub</button>
      </div>
      <div className="space-y-3">
        {pubs.map(p => (
          <div key={p.id} className="bg-[var(--bg-elevated)] border border-[var(--border)] p-5 rounded-xl flex items-center justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <div className="font-['DM_Mono'] text-[14px] text-[var(--text-base)] font-bold truncate">{p.title}</div>
              <div className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)]">{p.conference} · {p.year}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openForm(p)} className="text-[var(--text-muted)] hover:text-[var(--accent)]"><FiEdit2 /></button>
              <button onClick={async () => { if(confirm('Delete?')) await deleteDoc(doc(db,'publications',p.id)) }} className="text-[var(--text-muted)] hover:text-red-400"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl p-8 w-full max-w-xl max-h-[85vh] overflow-y-auto">
             <h3 className="font-['Cormorant_Garamond'] font-semibold text-[24px] mb-6">{editing ? 'Edit' : 'Add'} Publication</h3>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               {['title', 'conference', 'year', 'type', 'authorPosition', 'url', 'doi'].map(f => (
                 <div key={f}>
                   <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] uppercase mb-1">{f}</label>
                   <input {...register(f)} className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded px-3 py-2 font-['DM_Mono'] text-[13px] text-[var(--text-base)] outline-none" />
                 </div>
               ))}
               <div className="flex gap-3">
                 <button type="submit" className="flex-1 bg-[var(--accent)] text-[var(--bg-base)] font-['DM_Mono'] text-[13px] font-bold py-3 rounded">Save</button>
                 <button type="button" onClick={() => setShowForm(false)} className="px-6 border border-[var(--border)] text-[var(--text-muted)] rounded">Cancel</button>
               </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
