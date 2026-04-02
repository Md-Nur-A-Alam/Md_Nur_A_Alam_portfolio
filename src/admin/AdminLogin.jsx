import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import ThemeSwitcher from '../components/ui/ThemeSwitcher';
import { ThreeDots } from 'react-loader-spinner';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.message?.replace('Firebase: ', '') || 'Login failed', {
        style: { background: 'var(--bg-elevated)', color: 'var(--text-base)', border: '1px solid var(--border)' }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = getValues('email');
    if (!email) {
      toast.error('Enter your email first');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent to your Gmail', {
        duration: 5000,
        style: { background: 'var(--bg-elevated)', color: 'var(--text-base)', border: '1px solid var(--border)' }
      });
    } catch (err) {
      toast.error(err.message?.replace('Firebase: ', '') || 'Failed to send reset email');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Theme switcher top-right */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeSwitcher />
      </div>

      {/* Login card */}
      <div
        className="relative z-10 w-full max-w-md mx-4 rounded-2xl p-10 border"
        style={{ background: 'var(--bg-card)', backdropFilter: 'blur(16px)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}
      >
        {/* Monogram */}
        <div className="text-center mb-8">
          <div className="font-['Cormorant_Garamond'] italic font-semibold text-[64px] leading-none text-[var(--accent)] mb-1 select-none">
            N·A
          </div>
          <div className="font-['DM_Mono'] text-[11px] tracking-[0.3em] text-[var(--text-muted)] uppercase flex items-center justify-center gap-2">
            <FiLock className="text-xs" /> Admin Access
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          {/* Email */}
          <div className="relative group">
            <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-2 uppercase tracking-widest group-focus-within:text-[var(--accent)] transition-colors">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              placeholder="mdnuralam2812@gmail.com"
              {...register('email', { required: 'Email is required' })}
              className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent)] outline-none text-[var(--text-base)] font-['DM_Mono'] text-[14px] py-2.5 transition-colors placeholder:text-[var(--text-faint)]"
            />
            {errors.email && <p className="font-['DM_Mono'] text-[11px] text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative group">
            <label className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-2 uppercase tracking-widest group-focus-within:text-[var(--accent)] transition-colors">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                {...register('password', { required: 'Password is required' })}
                className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent)] outline-none text-[var(--text-base)] font-['DM_Mono'] text-[14px] py-2.5 pr-10 transition-colors placeholder:text-[var(--text-faint)]"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-0 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                data-cursor="hover"
              >
                {showPw ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="font-['DM_Mono'] text-[11px] text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          {/* Forgot password */}
          <button
            type="button"
            onClick={handleForgotPassword}
            className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-right -mt-4"
            data-cursor="hover"
          >
            Forgot password?
          </button>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg-base)] font-['DM_Mono'] text-[13px] font-bold py-3.5 rounded-lg transition-all hover:opacity-90 disabled:opacity-70"
            data-cursor="hover"
          >
            {loading
              ? <ThreeDots height="20" width="36" color="var(--bg-base)" />
              : 'SIGN IN →'
            }
          </button>
        </form>
      </div>
    </div>
  );
}
