export interface Project {
  slug: string;
  name: string;
  category: string;
  year: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  textColor: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface IconLink {
  src: string;
  alt: string;
  link: string;
}

export interface TechItem {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'design';
}
