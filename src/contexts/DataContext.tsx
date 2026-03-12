import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  writeBatch,
  setDoc,
} from 'firebase/firestore';
import { db, isConfigured } from '@/config/firebase';
import type { Experience, Education, Skill, Project, PersonalContent, PersonalTab } from '@/types';

// Default hardcoded data used when Firebase is not configured
const defaultExperiences: Experience[] = [
  {
    id: '1',
    title: 'Data Analyst',
    company: 'Stuvia',
    location: 'Amsterdam, NL',
    periodStart: 'Dec 2021',
    periodEnd: null,
    description: 'Responsible for analysis in marketing, finance, and user experience. Tracking user behavior to optimize website functionalities.',
    achievements: [
      'Reconstructed search function formulas and weights',
      'Set up AWS Redshift data warehouse using AWS Glue'
    ],
    order: 0,
  },
  {
    id: '2',
    title: 'Intern Data Science',
    company: 'DPG Media',
    location: 'Amsterdam, NL',
    periodStart: 'May 2021',
    periodEnd: 'Sep 2021',
    description: 'Part of the News Analytics Team at the biggest media company in Benelux.',
    achievements: [
      'Analyzed article success through contextual variables',
      'Implemented visualization using Looker'
    ],
    order: 1,
  },
  {
    id: '3',
    title: 'Intern Data Analysis',
    company: 'Prowise Learn',
    location: 'Amsterdam, NL',
    periodStart: 'Feb 2020',
    periodEnd: 'Jul 2020',
    description: 'Prowise Learn, formerly called "Oefenweb", is a software company with an application that contains adaptive online exercises for primary and secondary education.',
    achievements: [
      'Worked on an adaptive scoring system by psychometrically analyzing and evaluating scoring values',
      'Enhanced skills in psychometric evaluation and analysis'
    ],
    order: 2,
  },
];

const defaultEducation: Education[] = [
  {
    id: '1',
    degree: 'MSc Behavioural Data Science',
    institution: 'University of Amsterdam',
    location: 'Amsterdam, NL',
    periodStart: 'Sep 2019',
    periodEnd: 'Sep 2021',
    description: "This master's (and premaster's) combines techniques from Psychology with approaches from computer science, teaching the use of big data to better understand and predict human behaviour.",
    achievements: [
      'Thesis: "Assessing the Role of Goal Types in Pedestrian Behaviour: a Simulation Study"',
      'Graduated cum laude with a 9/10 thesis grade'
    ],
    order: 0,
  },
  {
    id: '2',
    degree: 'BSc Psychology',
    institution: 'Vrije Universiteit Amsterdam',
    location: 'Amsterdam, NL',
    periodStart: 'Sep 2012',
    periodEnd: 'Jul 2016',
    description: 'Focused on Cognitive Psychology, gaining experience in quantitative analysis with SPSS.',
    achievements: [
      'Thesis: "Temporal Order in the Visual Working Memory"',
      'Created experiments using Python-based OpenSesame software'
    ],
    order: 1,
  },
];

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Search Ranking — Elasticsearch',
    description: 'Redesigned Stuvia\'s search scoring model from the ground up, combining text relevance, recency, popularity, and document quality into a single ranking formula.',
    fullDescription: `One of my first major projects at Stuvia was overhauling the search function. The existing model had been untouched for years — it over-weighted download counts, ignored document recency, and was vulnerable to manipulation by sellers gaming the ranking.

I rebuilt the scoring formula using Elasticsearch's function score API, designing a multi-signal model that blends text match, recency decay, popularity, and quality indicators. Getting the balance right required careful experimentation: I used spline functions to tune how each signal scales, ran A/B tests against the legacy model, and iterated based on click-through and conversion data.

The result was a more accurate, fairer, and manipulation-resistant search experience — one that surfaces the most relevant study material, not just the most-downloaded.`,
    image: 'https://res.cloudinary.com/jonne/image/upload/v1730905090/Searchscorefunction.png',
    technologies: ['Elasticsearch', 'Python', 'A/B Testing', 'Data Analysis'],
    order: 0,
  },
  {
    id: '2',
    title: 'Data Warehouse Migration — AWS',
    description: 'Led the migration from a MySQL-based analytics setup to a scalable AWS data warehouse, unlocking faster queries and broader analytical capabilities.',
    fullDescription: `As Stuvia's data volumes grew, our MySQL-based analytics setup started to show its limits — slow queries, scaling issues, and limited support for complex analysis. Together with my manager, we scoped and executed a migration to AWS Glue + Amazon Redshift.

My role covered the full pipeline: auditing existing data sources, designing the schema for Redshift, and writing each ETL job in PySpark via AWS Glue. This involved mapping out table dependencies, handling data quality issues, and ensuring the output was consistent with our existing reporting.

The new warehouse cut query times dramatically and gave the team a much more flexible foundation for analysis — including support for larger datasets and more complex joins that weren't practical before.`,
    image: 'https://res.cloudinary.com/jonne/image/upload/v1730907159/Screenshot_2024-11-06_at_16.32.31.png',
    technologies: ['AWS Glue', 'Amazon Redshift', 'PySpark', 'ETL'],
    order: 1,
  },
  {
    id: '3',
    title: 'Payment Reconciliation Analysis',
    description: 'Investigated systematic mismatches between Stuvia\'s internal payment records and provider data, identifying root causes across multiple payment processors.',
    fullDescription: `Stuvia operates across multiple countries with several payment providers, making financial reconciliation genuinely complex. A backend developer had built a pipeline that pulled balance data from provider APIs into a reconciliation table — but a large number of transactions weren't matching up.

I took ownership of diagnosing the discrepancies. The issues turned out to be varied: missing transactions, currency conversion errors, banking country mismatches, and edge cases in how refunds were recorded by different providers. Each category required its own investigation and fix.

This project combined SQL-heavy data forensics with cross-functional collaboration — working with finance, backend, and payment provider support teams to trace and resolve each class of mismatch. The outcome was a clean reconciliation baseline and clearer monitoring for future discrepancies.`,
    image: 'https://res.cloudinary.com/jonne/image/upload/v1730905948/exchangerateProblem.jpg',
    technologies: ['SQL', 'Python', 'Financial Analysis', 'API Integration'],
    order: 2,
  },
];

const defaultSkills: Skill[] = [
  { id: '1', category: 'Programming', name: 'Python', proficiency: 90, order: 0 },
  { id: '2', category: 'Programming', name: 'R', proficiency: 75, order: 1 },
  { id: '3', category: 'Programming', name: 'MySQL', proficiency: 80, order: 2 },
  { id: '4', category: 'Programming', name: 'Redshift SQL', proficiency: 85, order: 3 },
  { id: '5', category: 'Programming', name: 'CSS', proficiency: 60, order: 4 },
  { id: '6', category: 'Data Analysis', name: 'Pandas', proficiency: 90, order: 0 },
  { id: '7', category: 'Data Analysis', name: 'NumPy', proficiency: 85, order: 1 },
  { id: '8', category: 'Data Analysis', name: 'Scikit-learn', proficiency: 75, order: 2 },
  { id: '9', category: 'Data Analysis', name: 'HuggingFace', proficiency: 60, order: 3 },
  { id: '10', category: 'Data Analysis', name: 'TensorFlow', proficiency: 55, order: 4 },
  { id: '11', category: 'Engineering Tools', name: 'AWS Glue', proficiency: 80, order: 0 },
  { id: '12', category: 'Engineering Tools', name: 'Amazon Redshift', proficiency: 85, order: 1 },
  { id: '13', category: 'Engineering Tools', name: 'AWS Lambda', proficiency: 65, order: 2 },
  { id: '14', category: 'Engineering Tools', name: 'PySpark', proficiency: 70, order: 3 },
  { id: '15', category: 'Visualization', name: 'Plotly', proficiency: 80, order: 0 },
  { id: '16', category: 'Visualization', name: 'Looker', proficiency: 85, order: 1 },
  { id: '17', category: 'Visualization', name: 'Matplotlib', proficiency: 75, order: 2 },
  { id: '18', category: 'Visualization', name: 'Seaborn', proficiency: 70, order: 3 },
  { id: '19', category: 'Other Tools', name: 'Amplitude', proficiency: 85, order: 0 },
  { id: '20', category: 'Other Tools', name: 'SPSS', proficiency: 70, order: 1 },
  { id: '21', category: 'Other Tools', name: 'GitHub', proficiency: 80, order: 2 },
  { id: '22', category: 'Other Tools', name: 'Jupyter Notebooks', proficiency: 90, order: 3 },
];

// Increment PERSONAL_VERSION whenever defaultPersonalContent changes — triggers a one-time Firestore migration.
const PERSONAL_VERSION = 3;
// Increment PROJECT_VERSION whenever defaultProjects text changes — triggers a one-time Firestore migration.
const PROJECT_VERSION = 2;

const defaultPersonalContent: PersonalContent = {
  tabs: [
    {
      id: 'languages',
      title: 'Languages',
      order: 0,
      text: `Languages have been a thread running through most of my adult life. It started during my Erasmus exchange in Budapest in 2015 — not with Hungarian, but with Spanish. What began as a Duolingo experiment quickly turned into a genuine obsession. I took formal university courses, spent a week in Madrid with friends, and eventually worked in tourism for about a year partly to fund a trip through South America, where my Spanish peaked. After a few quieter years, moving to Barcelona in 2022 put me back in the deep end — in the best possible way.\n\nItalian came through a different route. During that same Erasmus I was surrounded by Italian friends, so I picked up the basics almost by accident. In 2021 I decided to go further and spent a month in Florence completing an A1/A2 course. I've kept it ticking along since then.`,
      languages: [
        { name: 'Dutch', level: 5, note: 'Native' },
        { name: 'English', level: 5, note: 'Fluent' },
        { name: 'Spanish', level: 4, note: 'Advanced' },
        { name: 'Italian', level: 3, note: 'Intermediate' },
        { name: 'German', level: 2, note: 'Basic' },
      ],
    },
    {
      id: 'travel',
      title: 'Travel',
      order: 1,
      text: `Travel has shaped a lot of who I am. Growing up, my family took me to culturally rich destinations around the world — that early exposure stuck, and I've been chasing it ever since.\n\nMy Erasmus exchange in Budapest in 2015 was the real turning point. Living abroad for six months, surrounded by people from across Europe, opened up something I hadn't expected. After that I started travelling more independently — hopping between hostels, visiting friends, spending time in places that challenged my comfort zone. I worked in tourism, spent months backpacking through South America, and in 2022 made the move to Barcelona. Living in a city where I can practice Spanish daily and explore a new culture close up has been one of the better decisions I've made.`,
      image: 'https://res.cloudinary.com/jonne/image/upload/v1519130561/MUKC6488.jpg',
    },
  ],
};

interface DataContextType {
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  personalContent: PersonalContent;
  loading: boolean;
  error: string | null;
  addExperience: (data: Omit<Experience, 'id'>) => Promise<void>;
  updateExperience: (id: string, data: Partial<Experience>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  addEducation: (data: Omit<Education, 'id'>) => Promise<void>;
  updateEducation: (id: string, data: Partial<Education>) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;
  addSkill: (data: Omit<Skill, 'id'>) => Promise<void>;
  updateSkill: (id: string, data: Partial<Skill>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  addProject: (data: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updatePersonalContent: (data: Partial<PersonalContent>) => Promise<void>;
}

const DataContext = createContext<DataContextType>({
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  personalContent: defaultPersonalContent,
  loading: true,
  error: null,
  addExperience: async () => {},
  updateExperience: async () => {},
  deleteExperience: async () => {},
  addEducation: async () => {},
  updateEducation: async () => {},
  deleteEducation: async () => {},
  addSkill: async () => {},
  updateSkill: async () => {},
  deleteSkill: async () => {},
  addProject: async () => {},
  updateProject: async () => {},
  deleteProject: async () => {},
  updatePersonalContent: async () => {},
});

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [personalContent, setPersonalContent] = useState<PersonalContent>(defaultPersonalContent);
  const [loading, setLoading] = useState(isConfigured);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConfigured || !db) return;

    const unsubscribers: (() => void)[] = [];

    try {
      // Helper to seed a collection when it's empty
      const seedCollection = async (collectionName: string, items: object[]) => {
        if (!db) return;
        const batch = writeBatch(db);
        items.forEach((item) => {
          const ref = doc(collection(db!, collectionName));
          batch.set(ref, item);
        });
        await batch.commit();
      };

      // Experience listener
      const expQuery = query(collection(db, 'experiences'), orderBy('order'));
      unsubscribers.push(
        onSnapshot(expQuery, (snapshot) => {
          if (snapshot.empty) {
            // Seed Firestore with default data on first load
            const { id: _id, ...rest } = defaultExperiences[0];
            void seedCollection('experiences', defaultExperiences.map(({ id: _id, ...rest }) => rest));
          } else {
            const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Experience));
            setExperiences(data);
          }
          setLoading(false);
        }, (err) => {
          console.error('Firestore experiences error:', err);
          setError('Failed to load experiences');
          setLoading(false);
        })
      );

      // Education listener
      const eduQuery = query(collection(db, 'education'), orderBy('order'));
      unsubscribers.push(
        onSnapshot(eduQuery, (snapshot) => {
          if (snapshot.empty) {
            void seedCollection('education', defaultEducation.map(({ id: _id, ...rest }) => rest));
          } else {
            const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Education));
            setEducation(data);
          }
        }, (err) => {
          console.error('Firestore education error:', err);
        })
      );

      // Skills listener
      const skillsQuery = query(collection(db, 'skills'), orderBy('order'));
      unsubscribers.push(
        onSnapshot(skillsQuery, (snapshot) => {
          if (snapshot.empty) {
            void seedCollection('skills', defaultSkills.map(({ id: _id, ...rest }) => rest));
          } else {
            const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Skill));
            setSkills(data);
          }
        }, (err) => {
          console.error('Firestore skills error:', err);
        })
      );

      // Projects listener — migrates text when PROJECT_VERSION increases
      const projectsQuery = query(collection(db, 'projects'), orderBy('order'));
      unsubscribers.push(
        onSnapshot(projectsQuery, (snapshot) => {
          if (snapshot.empty) {
            void seedCollection('projects', defaultProjects.map(({ id: _id, ...rest }) => ({ ...rest, _dataVersion: PROJECT_VERSION })));
          } else {
            // Check if any doc is on an older version → migrate all project text
            const needsMigration = snapshot.docs.some((d) => (d.data()._dataVersion ?? 0) < PROJECT_VERSION);
            if (needsMigration) {
              const batch = writeBatch(db!);
              snapshot.docs.forEach((d) => {
                const firestoreOrder = d.data().order as number;
                const defaultMatch = defaultProjects.find((p) => p.order === firestoreOrder);
                if (defaultMatch) {
                  const { id: _id, ...rest } = defaultMatch;
                  batch.update(d.ref, { ...rest, _dataVersion: PROJECT_VERSION });
                }
              });
              void batch.commit();
            } else {
              const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
              setProjects(data);
            }
          }
        }, (err) => {
          console.error('Firestore projects error:', err);
        })
      );

      // Personal content listener — migrates structure/text when PERSONAL_VERSION increases
      const personalDocRef = doc(db, 'personalContent', 'main');
      unsubscribers.push(
        onSnapshot(personalDocRef, (snapshot) => {
          const version = snapshot.exists() ? (snapshot.data()._dataVersion ?? 0) : 0;
          if (!snapshot.exists() || version < PERSONAL_VERSION) {
            void setDoc(personalDocRef, { ...defaultPersonalContent, _dataVersion: PERSONAL_VERSION });
          } else {
            const data = snapshot.data() as PersonalContent & { _dataVersion?: number };
            const { _dataVersion: _v, ...content } = data;
            setPersonalContent(content as PersonalContent);
          }
        }, (err) => {
          console.error('Firestore personalContent error:', err);
        })
      );
    } catch (err) {
      console.error('Firestore setup error:', err);
      setError('Failed to connect to database');
      setLoading(false);
    }

    return () => unsubscribers.forEach((unsub) => unsub());
  }, []);

  // CRUD for experiences
  const addExperience = async (data: Omit<Experience, 'id'>) => {
    if (!db) return;
    await addDoc(collection(db, 'experiences'), data);
  };

  const updateExperience = async (id: string, data: Partial<Experience>) => {
    if (!db) return;
    await updateDoc(doc(db, 'experiences', id), data);
  };

  const deleteExperience = async (id: string) => {
    if (!db) return;
    await deleteDoc(doc(db, 'experiences', id));
  };

  // CRUD for education
  const addEducation = async (data: Omit<Education, 'id'>) => {
    if (!db) return;
    await addDoc(collection(db, 'education'), data);
  };

  const updateEducation = async (id: string, data: Partial<Education>) => {
    if (!db) return;
    await updateDoc(doc(db, 'education', id), data);
  };

  const deleteEducation = async (id: string) => {
    if (!db) return;
    await deleteDoc(doc(db, 'education', id));
  };

  // CRUD for skills
  const addSkill = async (data: Omit<Skill, 'id'>) => {
    if (!db) return;
    await addDoc(collection(db, 'skills'), data);
  };

  const updateSkill = async (id: string, data: Partial<Skill>) => {
    if (!db) return;
    await updateDoc(doc(db, 'skills', id), data);
  };

  const deleteSkill = async (id: string) => {
    if (!db) return;
    await deleteDoc(doc(db, 'skills', id));
  };

  // CRUD for projects
  const addProject = async (data: Omit<Project, 'id'>) => {
    if (!db) return;
    await addDoc(collection(db, 'projects'), data);
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    if (!db) return;
    await updateDoc(doc(db, 'projects', id), data);
  };

  const deleteProject = async (id: string) => {
    if (!db) return;
    await deleteDoc(doc(db, 'projects', id));
  };

  // Personal content
  const updatePersonalContent = async (data: Partial<PersonalContent>) => {
    if (!db) return;
    await updateDoc(doc(db, 'personalContent', 'main'), data);
  };

  return (
    <DataContext.Provider
      value={{
        experiences,
        education,
        skills,
        projects,
        personalContent,
        loading,
        error,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        updatePersonalContent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
