@AGENTS.md

# Portfolio — Project Conventions

## Stack
- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict mode
- Tailwind CSS v4, shadcn/ui components, framer-motion v12
- next-themes for dark/light mode (default: dark)

## File Layout
- `src/lib/constants.ts` — all site config, nav links, skills, social links
- `src/lib/github.ts` — ISR GitHub fetch (revalidate: 3600)
- `src/types/github.ts` — GitHubRepo interface
- `src/hooks/` — client-side hooks (useActiveSection)
- `src/components/layout/` — Navbar
- `src/components/sections/` — Hero, About, Skills, Projects, Resume, Contact
- `src/components/ui/` — shadcn primitives (do not hand-edit)

## Design System
- Background: `#020617` (slate-950)
- Accent: `#3B82F6` (electric blue, maps to `--primary` / `--ring`)
- Font heading: `DM Serif Display` via `--font-heading`
- Font mono: `JetBrains Mono` via `--font-mono`
- Section numbering: 01. about, 02. skills, 03. projects, 04. resume, 05. contact

## Rules
- All animations respect `useReducedMotion()` — pass `duration: 0` or skip `y`/`scale` when true
- Client components must have `"use client"` directive
- Server components (Projects/RepoGrid) are async, never "use client"
- No inline `style` for colors — use CSS variables / Tailwind classes
- Images go in `public/`; profile photo: `public/profile.jpg`, resume: `public/resume.pdf`

## Public Assets Needed
- `public/profile.jpg` — profile photo (recommended: 320×320 px minimum)
- `public/resume.pdf` — your resume

## Placeholders to Replace in `src/lib/constants.ts`
- `SITE_CONFIG.university` — e.g. "University of California, Berkeley"
- `SITE_CONFIG.degree` — e.g. "B.S. Computer Science"
- `SITE_CONFIG.graduationYear`
- `SITE_CONFIG.linkedin` — your LinkedIn handle
- `SKILLS` categories/items — tailor to your actual stack
