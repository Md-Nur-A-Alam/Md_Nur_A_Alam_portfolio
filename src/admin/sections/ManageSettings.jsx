import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { sendPasswordResetEmail } from 'firebase/auth';
import { db, storage, auth } from '../../lib/firebase';
import { useData } from '../../context/DataContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';

const toastStyle = { style: { background: 'var(--bg-elevated)', color: 'var(--text-base)', border: '1px solid var(--border)' } };

export default function ManageSettings() {
  const { settings } = useData();
  const { register, handleSubmit } = useForm({ values: settings });
  const [uploading, setUploading] = useState({ photo: false, cv: false });
  const [photoPreview, setPhotoPreview] = useState(settings?.profilePhotoUrl || null);

  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(p => ({ ...p, photo: true }));
    try {
      const url = await uploadFile(file, 'profile/photo.jpg');
      await setDoc(doc(db, 'settings', 'site'), { profilePhotoUrl: url }, { merge: true });
      setPhotoPreview(url);
      toast.success('Profile photo updated!', toastStyle);
    } catch (err) {
      toast.error('Upload failed: ' + err.message, toastStyle);
    } finally {
      setUploading(p => ({ ...p, photo: false }));
    }
  };

  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(p => ({ ...p, cv: true }));
    try {
      const url = await uploadFile(file, 'cv/resume.pdf');
      await setDoc(doc(db, 'settings', 'site'), { cvUrl: url }, { merge: true });
      toast.success('CV uploaded!', toastStyle);
    } catch (err) {
      toast.error('Upload failed: ' + err.message, toastStyle);
    } finally {
      setUploading(p => ({ ...p, cv: false }));
    }
  };

  const onSubmit = async (data) => {
    try {
      await setDoc(doc(db, 'settings', 'site'), { ...data, updatedAt: serverTimestamp() }, { merge: true });
      toast.success('Settings saved!', toastStyle);
    } catch (err) {
      toast.error('Save failed: ' + err.message, toastStyle);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, 'mdnuralam2812@gmail.com');
      toast.success('Reset email sent to mdnuralam2812@gmail.com', { ...toastStyle, duration: 5000 });
    } catch (err) {
      toast.error(err.message, toastStyle);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="font-['Cormorant_Garamond'] font-semibold text-[32px] text-[var(--text-base)]">Settings</h2>
        <p className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)]">Manage site configuration</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Profile Photo */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6">
          <h3 className="font-['DM_Mono'] text-[12px] text-[var(--accent)] uppercase tracking-widest mb-5">Profile Photo</h3>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full border-2 border-[var(--border-bright)] overflow-hidden flex-shrink-0 bg-[var(--bg-secondary)]">
              {photoPreview
                ? <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-[var(--text-faint)] font-['Cormorant_Garamond'] text-2xl">N</div>
              }
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-[var(--bg-base)] border border-[var(--border)] hover:border-[var(--border-bright)] transition-colors rounded-lg px-4 py-2.5 font-['DM_Mono'] text-[12px] text-[var(--text-muted)]" data-cursor="hover">
              <FiUpload /> {uploading.photo ? 'Uploading...' : 'Upload Photo'}
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* CV Upload */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6">
          <h3 className="font-['DM_Mono'] text-[12px] text-[var(--accent)] uppercase tracking-widest mb-5">CV / Resume</h3>
          <label className="flex items-center gap-2 cursor-pointer bg-[var(--bg-base)] border border-[var(--border)] hover:border-[var(--border-bright)] transition-colors rounded-lg px-4 py-2.5 font-['DM_Mono'] text-[12px] text-[var(--text-muted)] w-fit" data-cursor="hover">
            <FiUpload /> {uploading.cv ? 'Uploading...' : 'Upload PDF Resume'}
            <input type="file" accept=".pdf" onChange={handleCvUpload} className="hidden" />
          </label>
          {settings?.cvUrl && (
            <a href={settings.cvUrl} target="_blank" rel="noreferrer" className="block mt-3 font-['DM_Mono'] text-[11px] text-[var(--accent)] hover:underline">
              Current CV: View →
            </a>
          )}
        </div>

        {/* Availability */}
        <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 space-y-5">
          <h3 className="font-['DM_Mono'] text-[12px] text-[var(--accent)] uppercase tracking-widest">Availability</h3>
          <div className="flex items-center gap-4">
            <input type="checkbox" id="openToWork" {...register('openToWork')} className="w-4 h-4 accent-[var(--accent)]" />
            <label htmlFor="openToWork" className="font-['DM_Mono'] text-[13px] text-[var(--text-base)]">Open to Work</label>
          </div>
          <div>
            <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] uppercase tracking-widest mb-2">Availability Text</label>
            <input type="text" {...register('availabilityText')}
              className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded px-3 py-2.5 font-['DM_Mono'] text-[13px] text-[var(--text-base)] outline-none focus:border-[var(--accent)] transition-colors" />
          </div>
        </div>

        <button type="submit" className="bg-[var(--accent)] text-[var(--bg-base)] font-['DM_Mono'] text-[13px] font-bold px-8 py-3 rounded hover:opacity-90 transition-opacity" data-cursor="hover">
          Save Settings
        </button>
      </form>

      {/* Password Reset */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6">
        <h3 className="font-['DM_Mono'] text-[12px] text-[var(--accent)] uppercase tracking-widest mb-4">Admin Password Reset</h3>
        <p className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)] mb-4">Send a password reset link to mdnuralam2812@gmail.com</p>
        <button onClick={handlePasswordReset} className="border border-[var(--border-bright)] text-[var(--accent)] font-['DM_Mono'] text-[12px] px-5 py-2.5 rounded hover:bg-[var(--accent)] hover:text-[var(--bg-base)] transition-all" data-cursor="hover">
          Send Reset Email
        </button>
      </div>
    </div>
  );
}
