import { Project, TechItem } from "@/types";

export const projects: Project[] = [
  {
    slug: "visual-query-builder",
    name: "Visual Query Builder",
    shortDescription: "A drag-and-drop SQL query builder for accessible data exploration.",
    fullDescription: "An interactive visual SQL query builder that lets people compose complex queries without memorising syntax, while still generating production-ready queries under the hood.",
    coverImage: "/projects/querycraft.jpg",
    textColor: "text-white",
    tags: ["Next.js", "TypeScript", "Tailwind", "React"],
    githubUrl: "https://github.com/holydev001/visual-query-builder",
    liveUrl: "https://visual-query-builder-ten.vercel.app/",
    features: [
      "Drag-and-drop query composition",
      "Production-ready SQL output",
      "Accessible data exploration",
      "Interactive query building"
    ]
  },
  {
    slug: "objekt-404",
    name: "OBJEKT//404",
    shortDescription: "A cinematic, interactive 3D artifact from an unrendered future.",
    fullDescription: "An experimental 3D web artifact designed as a love letter to brutalist web design and real-time 3D. Drag, scroll, and hover to manipulate the broadcast.",
    coverImage: "/projects/objekt-404.jpg",
    textColor: "text-white",
    tags: ["React", "Three.js", "TypeScript", "GSAP"],
    githubUrl: "https://github.com/holydev001/objekt-404",
    liveUrl: "https://objekt-404.vercel.app/",
    features: [
      "Interactive 3D object",
      "Scroll and drag controls",
      "Cinematic motion direction",
      "Real-time rendering"
    ]
  },
  {
    slug: "kairo",
    name: "Kairo",
    shortDescription: "A local-first personal command center for reflection and direction.",
    fullDescription: "A desktop journal and personal command center built around Kaizen. It helps you set intentions, keep commitments, reflect each evening, and review your direction each week—entirely on your device.",
    coverImage: "/projects/kairo.jpg",
    textColor: "text-white",
    tags: ["Electron", "React", "TypeScript", "SQLite", "Zustand"],
    githubUrl: "https://github.com/holydev001/kairo",
    liveUrl: "https://github.com/holydev001/kairo/releases/download/v0.1.0-beta.11/Kairo-Setup-0.1.0-beta.11-x64.exe",
    features: [
      "Local-first data ownership",
      "Daily reflection workflow",
      "Weekly direction reviews",
      "Windows desktop application"
    ]
  },
  {
    slug: "blueprint-portfolio",
    name: "Blueprint Portfolio",
    shortDescription: "A motion-led portfolio variation built on a cool blueprint grid.",
    fullDescription: "A responsive portfolio exploration using a cool-toned blueprint grid, kinetic interface details, and crisp, motion-led transitions.",
    coverImage: "/projects/blueprint-portfolio.jpg",
    textColor: "text-white",
    tags: ["Next.js", "React", "Tailwind", "Framer Motion"],
    githubUrl: "https://github.com/holydev001/sub-port",
    liveUrl: "https://holydev-sigma.vercel.app/",
    features: [
      "Blueprint visual system",
      "Kinetic interface details",
      "Responsive layout",
      "Motion-led transitions"
    ]
  },
  {
    slug: "3d-portfolio",
    name: "3D Portfolio",
    shortDescription: "An immersive cosmic portfolio powered by interactive Three.js scenes.",
    fullDescription: "An immersive cosmic portfolio variation with an interactive Three.js hero, particle systems, orbiting geometry, and GSAP-powered motion.",
    coverImage: "/projects/3d-portfolio.jpg",
    textColor: "text-white",
    tags: ["Next.js", "Three.js", "React Three Fiber", "GSAP", "TypeScript"],
    githubUrl: "https://github.com/holydev001/3d-port",
    liveUrl: "https://3d-port-phi.vercel.app/",
    features: [
      "Interactive Three.js hero",
      "Particle systems",
      "Orbiting geometry",
      "GSAP-powered motion"
    ]
  }
];

export const techStack: TechItem[] = [
  { name: "React", icon: "⚛️", category: "frontend" },
  { name: "Next.js", icon: "▲", category: "frontend" },
  { name: "TypeScript", icon: "📘", category: "frontend" },
  { name: "JavaScript", icon: "JS", category: "frontend" },
  { name: "Tailwind CSS", icon: "🎨", category: "frontend" },
  { name: "Python", icon: "🐍", category: "backend" },
  { name: "Node.js", icon: "🟢", category: "backend" },
  { name: "Express", icon: "🚂", category: "backend" },
  { name: "FastAPI", icon: "⚡", category: "backend" },
  { name: "Django", icon: "DJ", category: "backend" },
  { name: "MySQL", icon: "◫", category: "backend" },
  { name: "MongoDB", icon: "🍃", category: "backend" },
  { name: "Supabase", icon: "⚡", category: "backend" },
  { name: "React Native", icon: "◉", category: "frontend" },
  { name: "Three.js", icon: "🧊", category: "frontend" },
  { name: "GSAP", icon: "🎬", category: "frontend" },
  { name: "Git", icon: "⌘", category: "tools" },
  { name: "Figma", icon: "🎯", category: "design" },
];

export const socialLinks = [
  {
    src: "/x.png",
    alt: "Twitter",
    link: "https://x.com/holydev0001",
  },
  {
    src: "/github.png",
    alt: "GitHub",
    link: "https://github.com/holydev001",
  },
  {
    src: "/linked-in.png",
    alt: "LinkedIn",
    link: "https://www.linkedin.com/in/david-adams-b0228835b/",
  },
];

export const certifications = [
  {
    title: "Project Management",
    issuer: "Joint Professional Training and Support",
    url: "https://drive.google.com/file/d/10fGkRdGm-2iDLL9nR2aYa3JiUtPm4hOV/view?usp=drive_link",
  },
  {
    title: "Introduction to Programming",
    issuer: "Suacode",
    url: "https://drive.google.com/file/d/10fGkRdGm-2iDLL9nR2aYa3JiUtPm4hOV/view?usp=drive_link",
  },
  {
    title: "Foundations of Web Development",
    issuer: "Udemy",
    url: null,
  },
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    url: null,
  },
];
