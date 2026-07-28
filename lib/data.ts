import { Project, TechItem } from "@/types";

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    name: "E-Commerce Platform",
    shortDescription: "Full-stack shopping experience with real-time inventory",
    fullDescription: "A modern e-commerce platform built with Next.js 14, featuring real-time inventory management, Stripe payments, and an admin dashboard. Implements server-side rendering for optimal SEO and performance.",
    coverImage: "/projects/ecommerce.jpg",
    textColor: "text-white",
    tags: ["Next.js", "TypeScript", "Prisma", "Stripe", "Tailwind"],
    githubUrl: "https://github.com/holydev001",
    liveUrl: "https://example.com",
    features: [
      "Real-time inventory tracking",
      "Stripe payment integration",
      "Admin dashboard with analytics",
      "Server-side rendering",
      "Responsive design"
    ]
  },
  {
    slug: "task-management",
    name: "Task Manager Pro",
    shortDescription: "Collaborative project management with real-time updates",
    fullDescription: "A collaborative task management application featuring drag-and-drop interfaces, real-time updates via WebSockets, and team collaboration tools. Built with React and Node.js.",
    coverImage: "/projects/taskmanager.jpg",
    textColor: "text-white",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    githubUrl: "https://github.com/holydev001",
    features: [
      "Drag-and-drop task boards",
      "Real-time collaboration",
      "Team workspaces",
      "Activity tracking",
      "Email notifications"
    ]
  },
  {
    slug: "ai-chatbot",
    name: "AI Assistant",
    shortDescription: "Intelligent chatbot with natural language processing",
    fullDescription: "An AI-powered chatbot interface leveraging OpenAI's GPT models. Features conversation history, markdown rendering, and custom prompt engineering for specialized use cases.",
    coverImage: "/projects/ai-chat.jpg",
    textColor: "text-white",
    tags: ["Next.js", "OpenAI", "TypeScript", "Redis", "Vercel AI SDK"],
    githubUrl: "https://github.com/holydev001",
    liveUrl: "https://example.com",
    features: [
      "GPT-4 integration",
      "Conversation persistence",
      "Markdown rendering",
      "Custom prompt templates",
      "Export conversations"
    ]
  },
  {
    slug: "portfolio-cms",
    name: "Portfolio CMS",
    shortDescription: "Headless CMS for creative portfolios",
    fullDescription: "A headless content management system designed specifically for creative professionals. Features media optimization, custom themes, and a visual content builder.",
    coverImage: "/projects/cms.jpg",
    textColor: "text-white",
    tags: ["Next.js", "Sanity", "GSAP", "Framer Motion", "Tailwind"],
    githubUrl: "https://github.com/holydev001",
    features: [
      "Visual content builder",
      "Media optimization",
      "Custom theme system",
      "SEO automation",
      "Analytics dashboard"
    ]
  },
  {
    slug: "weather-dashboard",
    name: "Weather Analytics",
    shortDescription: "Real-time weather data visualization dashboard",
    fullDescription: "A comprehensive weather dashboard displaying real-time data with interactive charts and maps. Uses multiple weather APIs and features location-based forecasts.",
    coverImage: "/projects/weather.jpg",
    textColor: "text-white",
    tags: ["React", "D3.js", "Mapbox", "TypeScript", "Vite"],
    githubUrl: "https://github.com/holydev001",
    liveUrl: "https://example.com",
    features: [
      "Interactive weather maps",
      "Historical data charts",
      "Location-based alerts",
      "7-day forecasts",
      "Severe weather warnings"
    ]
  },
  {
    slug: "social-network",
    name: "DevConnect",
    shortDescription: "Social platform for developers",
    fullDescription: "A social networking platform built for developers to share projects, collaborate, and network. Features code snippet sharing, project showcases, and direct messaging.",
    coverImage: "/projects/social.jpg",
    textColor: "text-white",
    tags: ["Next.js", "GraphQL", "PostgreSQL", "AWS", "Docker"],
    githubUrl: "https://github.com/holydev001",
    features: [
      "Code snippet sharing",
      "Project showcases",
      "Direct messaging",
      "GitHub integration",
      "Developer profiles"
    ]
  }
];

export const techStack: TechItem[] = [
  { name: "React", icon: "⚛️", category: "frontend" },
  { name: "Next.js", icon: "▲", category: "frontend" },
  { name: "TypeScript", icon: "📘", category: "frontend" },
  { name: "Tailwind CSS", icon: "🎨", category: "frontend" },
  { name: "Node.js", icon: "🟢", category: "backend" },
  { name: "Express", icon: "🚂", category: "backend" },
  { name: "PostgreSQL", icon: "🐘", category: "backend" },
  { name: "MongoDB", icon: "🍃", category: "backend" },
  { name: "Prisma", icon: "◭", category: "backend" },
  { name: "Docker", icon: "🐳", category: "tools" },
  { name: "Git", icon: "📦", category: "tools" },
  { name: "AWS", icon: "☁️", category: "tools" },
  { name: "Figma", icon: "🎯", category: "design" },
  { name: "Three.js", icon: "🧊", category: "frontend" },
  { name: "GSAP", icon: "🎬", category: "frontend" },
  { name: "GraphQL", icon: "◈", category: "backend" },
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
