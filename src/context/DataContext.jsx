import { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  fallbackProjects, fallbackExperience, fallbackSkills,
  fallbackPublications, fallbackSettings
} from '../data/fallback';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [projects,     setProjects]     = useState(fallbackProjects);
  const [experience,   setExperience]   = useState(fallbackExperience);
  const [skills,       setSkills]       = useState(fallbackSkills);
  const [publications, setPublications] = useState(fallbackPublications);
  const [settings,     setSettings]     = useState(fallbackSettings);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    const unsubs = [];
    const listen = (col, setter, field = 'order') => {
      const q = query(collection(db, col), orderBy(field));
      unsubs.push(onSnapshot(q, snap => {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (data.length > 0) setter(data);
        setLoading(false);
      }, () => setLoading(false)));
    };

    listen('projects', setProjects);
    listen('experience', setExperience);
    listen('skills', setSkills);
    listen('publications', setPublications, 'year');

    // Settings is a single doc
    const settingsRef = doc(db, 'settings', 'site');
    unsubs.push(onSnapshot(settingsRef, snap => {
      if (snap.exists()) setSettings(snap.data());
    }));

    return () => unsubs.forEach(u => u());
  }, []);

  return (
    <DataContext.Provider value={{ projects, experience, skills, publications, settings, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
