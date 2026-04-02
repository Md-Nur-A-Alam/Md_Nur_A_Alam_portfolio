export const fallbackProjects = [
  {
    id: 1, order: 1, featured: true, status: "active",
    title: "CueKeep",
    category: "React Native",
    description: "Caregiver-facing AI mobile application with RAG architecture. Built as AI Software Engineer Intern at Privacce Labs. Features complete drawer navigation, custom theming, JWT authentication, and real-time AI-powered care coordination.",
    tech: ["React Native", "Expo SDK 54", "Zustand", "React Query", "FastAPI", "RAG"],
    liveUrl: "https://www.privaccelabs.com/",
    githubUrl: null,
    badge: "LIVE · IN PROGRESS"
  },
  {
    id: 2, order: 2, featured: false, status: "complete",
    title: "High School Management System",
    category: "Full Stack",
    description: "Role-based academic management system tested with 1260 students and 47 teachers. ACID-compliant MySQL database, 80+ subjects, 60+ classrooms, full CRUD admin dashboard.",
    tech: ["PHP", "MySQL", "JavaScript", "Bootstrap5", "HTML/CSS"],
    githubUrl: "https://github.com/Md-Nur-A-Alam",
  },
  {
    id: 3, order: 3, featured: false, status: "complete",
    title: "MediNet-XG",
    category: "AI/ML",
    description: "Lightweight CNN (342 KB) for medicinal plant classification using inverted residual blocks and selective channel attention. Achieved 98.82% accuracy and 98.79% F1-score, outperforming heavy transfer-learning models. Suitable for mobile/edge deployment.",
    tech: ["Python", "Deep Learning", "CNN", "PyTorch"],
    githubUrl: "https://github.com/Md-Nur-A-Alam",
  },
  {
    id: 4, order: 4, featured: false, status: "published",
    title: "BnLiteBait",
    category: "AI/ML",
    description: "Attention-based lightweight deep learning model for clickbait detection in Bengali text. Published at 3rd International Conference on Big Data, IoT & ML (BIM 2025). Addresses the challenge of Bengali NLP with an efficiency-first architecture.",
    tech: ["Python", "NLP", "Attention Mechanism", "Bengali Text"],
    liveUrl: "https://www.researchgate.net/publication/400072760",
    badge: "IEEE PUBLISHED"
  },
  {
    id: 5, order: 5, featured: false, status: "complete",
    title: "স্বাধীন — Bangla Voice AI",
    category: "AI/Systems",
    description: "Voice-controlled AI alarm system supporting hands-free natural language commands in Bangla. Designed for Arduino and Raspberry Pi deployment.",
    tech: ["Python", "Voice AI", "Arduino", "Raspberry Pi", "Bangla NLP"],
    githubUrl: "https://github.com/Md-Nur-A-Alam"
  },
  {
    id: 6, order: 6, featured: false, status: "complete",
    title: "BChat",
    category: "Frontend",
    description: "Secure real-time chat application with end-to-end messaging.",
    tech: ["React", "Firebase", "Real-time"],
    githubUrl: "https://github.com/Md-Nur-A-Alam"
  },
  {
    id: 7, order: 7, featured: false, status: "complete",
    title: "NanoTutor",
    category: "AI/ML",
    description: "AI-driven personal tutoring platform with adaptive learning paths.",
    tech: ["React", "AI", "Firebase"],
    githubUrl: "https://github.com/Md-Nur-A-Alam"
  },
  {
    id: 8, order: 8, featured: false, status: "complete",
    title: "StatisLab",
    category: "Frontend",
    description: "Interactive statistics learning and visualization tool with real-time chart rendering.",
    tech: ["React", "Recharts", "Statistics"],
    githubUrl: "https://github.com/Md-Nur-A-Alam"
  },
  {
    id: 9, order: 9, featured: false, status: "complete",
    title: "DigiTools Platform",
    category: "Frontend",
    description: "Digital product storefront built with React.js, Tailwind CSS, DaisyUI. Deployed on Netlify.",
    tech: ["React", "Tailwind CSS", "DaisyUI", "Netlify"],
    githubUrl: "https://github.com/Md-Nur-A-Alam"
  }
];

export const fallbackExperience = [
  {
    id: 1,
    company: "Privacce Labs",
    companyUrl: "https://www.privaccelabs.com/",
    role: "AI Software Engineer Intern",
    from: "2025",
    to: "Present",
    current: true,
    description: "Building CueKeep — a caregiver-facing React Native/Expo mobile application powered by a RAG (Retrieval-Augmented Generation) architecture. Responsibilities include complete UI restructuring (replacing bottom tab navigation with a drawer system), implementing a strict theming system using custom useAppTheme() hooks, Zustand v5 state management, React Query v5 for server-state, and integrating a RagMobileApiClient with JWT authentication via expo-secure-store against a FastAPI backend.",
    tech: ["React Native", "Expo SDK 54", "Expo Router v6", "Zustand v5", "React Query v5", "FastAPI", "RAG", "JWT Auth"]
  },
  {
    id: 2,
    company: "Mojaru EdTech Platform",
    role: "Math Olympiad Instructor",
    from: "2025",
    to: "Present",
    current: true,
    description: "Teaching competitive mathematics to students nationwide on Bangladesh's leading EdTech platform. Preparing students for the National Undergraduate Mathematics Olympiad.",
    tech: ["Teaching", "Curriculum Design", "Math Olympiad"]
  },
  {
    id: 3,
    company: "Signature VIP Service",
    role: "Business Operational Manager",
    from: "2023",
    to: "2024",
    current: false,
    description: "Managed day-to-day operations for a Meet & Greet VIP service. Handled logistics, client relations, and team coordination.",
    tech: ["Operations", "Client Management", "Leadership"]
  },
  {
    id: 4,
    company: "Freelancing · Fiverr & Freelancer.com",
    role: "Graphic & Motion Designer",
    from: "2019",
    to: "Present",
    current: true,
    description: "6+ years of freelance work in graphic design and 2D motion graphics. Logo design, branding, and animated video content for international clients.",
    tech: ["Photoshop", "Illustrator", "After Effects", "Motion Graphics"]
  },
  {
    id: 5,
    company: "Golden Sun Cadet Coaching Center",
    role: "Math & Science Instructor",
    from: "2019",
    to: "2021",
    current: false,
    description: "Taught mathematics and science to secondary school students.",
    tech: ["Teaching", "Mathematics", "Science"]
  }
];

export const fallbackSkills = [
  {
    category: "Frontend",
    icon: "FiMonitor",
    skills: [
      { name: "React.js", proficiency: 90, order: 1 },
      { name: "React Native / Expo", proficiency: 82, order: 2 },
      { name: "Next.js", proficiency: 72, order: 3 },
      { name: "Tailwind CSS", proficiency: 92, order: 4 },
      { name: "JavaScript (ES2024)", proficiency: 88, order: 5 },
      { name: "HTML5 & CSS3", proficiency: 95, order: 6 },
      { name: "Framer Motion", proficiency: 75, order: 7 },
      { name: "DaisyUI / Bootstrap", proficiency: 85, order: 8 },
    ],
    order: 1
  },
  {
    category: "Languages",
    icon: "FiCode",
    skills: [
      { name: "C / C++", proficiency: 85, order: 1 },
      { name: "Python", proficiency: 80, order: 2 },
      { name: "PHP", proficiency: 70, order: 3 },
      { name: "JavaScript", proficiency: 88, order: 4 },
    ],
    order: 2
  },
  {
    category: "AI/ML",
    icon: "FiBrain",
    skills: [
      { name: "Deep Learning (CNN)", proficiency: 78, order: 1 },
      { name: "Bangla NLP", proficiency: 72, order: 2 },
      { name: "Image Processing", proficiency: 75, order: 3 },
      { name: "PyTorch / Keras", proficiency: 68, order: 4 },
      { name: "RAG Architecture", proficiency: 70, order: 5 },
    ],
    order: 3
  },
  {
    category: "Tools",
    icon: "FiTool",
    skills: [
      { name: "Git & GitHub", proficiency: 88, order: 1 },
      { name: "Firebase", proficiency: 80, order: 2 },
      { name: "MySQL / SQLyog", proficiency: 85, order: 3 },
      { name: "VS Code", proficiency: 95, order: 4 },
      { name: "Zustand / React Query", proficiency: 80, order: 5 },
      { name: "Figma / Photoshop", proficiency: 72, order: 6 },
    ],
    order: 4
  }
];

export const fallbackPublications = [
  {
    id: 1,
    title: "CornNetLite: An Ultralight CNN for Corn Leaf Disease Classification in Low-Resource Agricultural Environments",
    conference: "2025 IEEE 7th International Conference on Sustainable Technologies for Industry 5.0 (STI)",
    type: "IEEE International Conference",
    doi: "10.1109/STI69347.2025.11367604",
    url: "https://ieeexplore.ieee.org/document/11367604",
    year: 2025,
    authors: ["Md. Nur A Alam", "Co-author 2", "Co-author 3"],
    authorPosition: "1st Author",
    abstract: "An ultralight CNN architecture achieving high accuracy for corn leaf disease detection in resource-constrained agricultural environments, optimized for mobile and edge deployment.",
    order: 1
  },
  {
    id: 2,
    title: "BnLiteBait: An Attention-Based Lightweight Model for Clickbait Detection in Bengali Text",
    conference: "3rd International Conference on Big Data, IoT, and Machine Learning (BIM 2025)",
    type: "International Conference",
    doi: "10.13140/RG.2.2.31280.21766",
    url: "https://www.researchgate.net/publication/400072760",
    year: 2025,
    authors: ["Author 1", "Author 2", "Md. Nur A Alam"],
    authorPosition: "3rd Author",
    abstract: "Attention-based lightweight deep learning model for detecting clickbait in Bengali text, addressing the scarcity of Bengali NLP tools with an efficiency-first design.",
    order: 2
  }
];

export const fallbackSettings = {
  id: "site",
  profilePhotoUrl: null,
  cvUrl: null,
  openToWork: true,
  availabilityText: "Open to full-time roles & freelance projects"
};
