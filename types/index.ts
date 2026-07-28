export interface Project {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  textColor: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
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
