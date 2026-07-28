# 3D Portfolio — Next.js + TypeScript + Tailwind + GSAP

A modern, immersive 3D portfolio built with cutting-edge web technologies.

## Features

- **3D Hero Scene** — Interactive Three.js background with floating geometries, particles, and stars
- **GSAP Animations** — ScrollTrigger-powered animations throughout all pages
- **Glass Morphism UI** — Modern glass-like card designs with backdrop blur
- **Cursor Glow Effect** — Interactive cursor following glow (desktop only)
- **Responsive Design** — Fully responsive across all device sizes
- **TypeScript** — Full type safety across the entire codebase
- **EmailJS Integration** — Working contact form with email delivery
- **Static Export** — Ready for deployment to any static hosting

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **Animations**: GSAP + ScrollTrigger
- **Icons**: Lucide React
- **Email**: EmailJS Browser

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env.local` file for EmailJS:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Project Structure

```
portfolio/
├── app/
│   ├── about/
│   │   ├── [slug]/          # Project detail pages
│   │   ├── all-projects/    # All projects grid
│   │   ├── page.tsx         # About page
│   │   ├── upperSec.tsx     # Bio + Tech stack
│   │   └── lowerSec.tsx     # Featured projects
│   ├── contact/
│   │   └── page.tsx         # Contact form
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── not-found.tsx        # 404 page
│   └── page.tsx             # Home page
├── components/
│   ├── 3d/
│   │   └── scene.tsx        # Three.js 3D scene
│   ├── cursorGlow.tsx       # Cursor glow effect
│   ├── footer.tsx           # Footer component
│   ├── glassCard.tsx        # Glass card wrapper
│   ├── header.tsx           # Navigation header
│   └── typingLoop.tsx       # Typing animation
├── lib/
│   ├── data.ts              # Projects, tech stack, links data
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript interfaces
├── public/                  # Static assets
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | 3D hero scene with typing animation |
| About | `/about` | Bio, tech stack, certifications, featured projects |
| All Projects | `/about/all-projects` | Complete project grid |
| Project Detail | `/about/[slug]` | Individual project details |
| Contact | `/contact` | Contact form with EmailJS |

## Customization

### Adding Projects
Edit `lib/data.ts` and add to the `projects` array:

```typescript
{
  slug: "my-project",
  name: "My Project",
  shortDescription: "Brief description",
  fullDescription: "Detailed description...",
  coverImage: "/projects/image.jpg",
  textColor: "text-white",
  tags: ["React", "TypeScript"],
  githubUrl: "https://github.com/...",
  liveUrl: "https://...",
  features: ["Feature 1", "Feature 2"]
}
```

### Adding Tech Stack Items
Edit `lib/data.ts` and add to `techStack`:

```typescript
{ name: "New Tech", icon: "🔧", category: "frontend" }
```

### Modifying 3D Scene
Edit `components/3d/scene.tsx` to customize:
- Floating shapes (cubes, spheres)
- Particle systems
- Lighting setup
- Star field

## Deployment

The project is configured for static export (`output: 'export'` in `next.config.js`).

Build and deploy:

```bash
npm run build
```

The `out/` folder will contain the static site ready for deployment to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting

## License

MIT License — feel free to use this template for your own portfolio.

## Credits

Built by David Adams
