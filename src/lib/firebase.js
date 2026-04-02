import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FB_API_KEY,
  authDomain:        import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MSG_SENDER_ID,
  appId:             import.meta.env.VITE_FB_APP_ID,
};

const app  = initializeApp(firebaseConfig);

export const db      = getFirestore(app);
export const auth    = getAuth(app);
export const storage = getStorage(app);

// Page view tracker — call once on Home mount
export const trackPageView = async () => {
  try {
    const { doc, setDoc, increment, serverTimestamp } = await import('firebase/firestore');
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const ref = doc(db, 'analytics', today);
    await setDoc(ref, {
      pageViews: increment(1),
      date: today,
      lastVisit: serverTimestamp(),
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
    }, { merge: true });
  } catch (e) {
    // Analytics failure is non-critical, fail silently
  }
};
