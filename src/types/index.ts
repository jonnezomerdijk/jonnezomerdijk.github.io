export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  periodStart: string;
  periodEnd: string | null;
  description: string;
  achievements: string[];
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  periodStart: string;
  periodEnd: string;
  description: string;
  achievements: string[];
  order: number;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  proficiency: number;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  order: number;
}

export interface Language {
  name: string;
  level: number; // 1-5
  note: string;
}

export interface PersonalTab {
  id: string;
  title: string;
  order: number;
  text: string;
  languages?: Language[]; // renders star-rating grid when present
  image?: string;         // renders alongside text when present
}

export interface PersonalContent {
  tabs: PersonalTab[];
}
