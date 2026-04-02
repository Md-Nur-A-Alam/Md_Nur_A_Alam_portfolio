import { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  fallbackProjects,
  fallbackExperience,
  fallbackSkills,
  fallbackPublications,
  fallbackSettings
} from '../data/fallback';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    projects: fallbackProjects,
    experience: fallbackExperience,
    skills: fallbackSkills,
    publications: fallbackPublications,
    settings: fallbackSettings,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If Firebase isn't configured, we just use fallback
    if (!import.meta.env.VITE_FB_API_KEY) {
      setLoading(false);
      return;
    }

    try {
      const unsubProjects = onSnapshot(query(collection(db, 'projects'), orderBy('order', 'asc')), (snapshot) => {
        const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(prev => ({ ...prev, projects: projects.length ? projects : fallbackProjects }));
      });

      const unsubExp = onSnapshot(query(collection(db, 'experience'), orderBy('order', 'asc')), (snapshot) => {
        const exp = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(prev => ({ ...prev, experience: exp.length ? exp : fallbackExperience }));
      });

      const unsubSkills = onSnapshot(query(collection(db, 'skills'), orderBy('order', 'asc')), (snapshot) => {
        const skills = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(prev => ({ ...prev, skills: skills.length ? skills : fallbackSkills }));
      });

      const unsubPubs = onSnapshot(query(collection(db, 'publications'), orderBy('order', 'asc')), (snapshot) => {
        const pubs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(prev => ({ ...prev, publications: pubs.length ? pubs : fallbackPublications }));
      });

      const unsubSettings = onSnapshot(doc(db, 'settings', 'site'), (docSnap) => {
        if (docSnap.exists()) {
          setData(prev => ({ ...prev, settings: { id: docSnap.id, ...docSnap.data() } }));
        }
      });

      setLoading(false);

      return () => {
        unsubProjects();
        unsubExp();
        unsubSkills();
        unsubPubs();
        unsubSettings();
      };
    } catch (err) {
      console.error("Firebase config error, using fallback data:", err);
      setError(err);
      setLoading(false);
    }
  }, []);

  return (
    <DataContext.Provider value={{ ...data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
