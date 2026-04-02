import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../lib/firebase';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  if (user === undefined) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
      <div className="loading loading-spinner loading-lg" style={{ color: 'var(--accent)' }} />
    </div>
  );

  return user ? children : <Navigate to="/admin/login" replace />;
}
