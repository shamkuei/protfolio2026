# Portfolio & Weblog — Project Documentation

A bilingual (English/Farsi) personal portfolio and blog application with a cyberpunk-minimal theme. Built with Next.js 16, Prisma, PostgreSQL, and Docker.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Internationalization (i18n)](#internationalization-i18n)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [API Routes](#api-routes)
- [Pages & Routing](#pages--routing)
- [Components](#components)
- [Styling & Theme](#styling--theme)
- [Docker & Deployment](#docker--deployment)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19, TailwindCSS v4 |
| Animation | Framer Motion |
| Database | PostgreSQL 16 (via Prisma 7) |
| Cache | Redis 7 |
| Auth | Auth.js v5 (NextAuth) — GitHub OAuth + Credentials |
| i18n | next-intl 4 (English + Farsi, RTL support) |
| Markdown | next-mdx-remote 6 + rehype-pretty-code (Shiki) |
| Icons | react-icons 5 (Font Awesome 6, Simple Icons, Heroicons, VS Code) |
| Validation | Zod 4 |
| Runtime | Node.js, Docker, pnpm |

---

## Project Structure

```
portfolio/
├── messages/                    # Translation files
│   ├── en.json                  # English translations
│   └── fa.json                  # Farsi translations
├── prisma/
│   └── schema.prisma            # Database schema (15+ models)
├── public/                      # Static assets
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── api/                 # API route handlers
│   │   │   ├── auth/[...nextauth]/  # Auth.js endpoint
│   │   │   ├── categories/      # Category CRUD
│   │   │   ├── posts/           # Post CRUD
│   │   │   ├── projects/        # Project CRUD
│   │   │   └── upload/          # File upload handler
│   │   ├── [locale]/            # Locale-scoped pages
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── layout.tsx       # Locale layout (fonts, RTL, providers)
│   │   │   ├── about/           # About page
│   │   │   ├── admin/           # Admin dashboard (auth-protected)
│   │   │   │   ├── categories/  # Category management
│   │   │   │   ├── posts/       # Post editor (new + edit)
│   │   │   │   ├── projects/    # Project editor
│   │   │   │   └── settings/    # Site settings
│   │   │   ├── blog/            # Blog list + [slug] detail
│   │   │   └── projects/        # Project list + [slug] detail
│   │   ├── globals.css          # Global styles + RTL + prose theme
│   │   └── layout.tsx           # Root layout (metadata only)
│   ├── components/
│   │   ├── about/               # About section + tech stack card
│   │   ├── admin/               # Admin shell, sidebar, auth guard
│   │   ├── blog/                # Post card, blog preview, markdown renderer
│   │   ├── devops/              # Uptime widget, deploy badges
│   │   ├── hero/                # Hero section + terminal animation
│   │   ├── layout/              # Header, footer, language switcher
│   │   └── projects/            # Project card, GitHub stats, screenshot carousel
│   ├── config/
│   │   ├── i18n.ts              # next-intl request config
│   │   └── routing.ts           # Locale routing + navigation helpers
│   ├── lib/
│   │   ├── auth.ts              # Auth.js configuration
│   │   ├── prisma.ts            # Prisma client singleton
│   │   └── utils.ts             # Utility functions (cn, formatDate, slugify, readingTime)
│   ├── types/
│   │   └── index.ts             # Shared TypeScript interfaces
│   └── middleware.ts             # Locale detection + redirect middleware
├── docker-compose.yml            # Production stack (app, postgres, redis, nginx, certbot)
├── docker-compose.dev.yml        # Development stack (app, postgres, redis)
├── Dockerfile                    # Production multi-stage build
├── Dockerfile.dev                # Development container
└── package.json
```

---

## Architecture Overview

```
                        ┌─────────┐
                        │  Nginx  │ :80/:443 (production only)
                        │  + SSL  │
                        └────┬────┘
                             │
                        ┌────┴────┐
                        │  Next.js │ :3000
                        │  (App)   │
                        └──┬───┬───┘
                           │   │
                 ┌─────────┘   └─────────┐
                 ▼                       ▼
          ┌──────────┐            ┌──────────┐
          │PostgreSQL│            │  Redis   │
          │   :5432  │            │  :6379   │
          └──────────┘            └──────────┘
```

- **Next.js** handles SSR, ISR, API routes, and static generation
- **PostgreSQL** stores all persistent data via Prisma ORM
- **Redis** used for caching (session, API responses)
- **Nginx** reverse proxy with SSL termination (production only)
- **Certbot** auto-renews Let's Encrypt certificates

---

## Internationalization (i18n)

### Supported Locales
- **English** (`en`) — default, LTR
- **Farsi** (`fa`) — RTL

### How It Works
1. `src/middleware.ts` detects the user's locale and redirects `/` to `/en` or `/fa`
2. `src/app/[locale]/layout.tsx` sets `<html lang dir="rtl|ltr">` based on locale
3. `next-intl` loads translations from `messages/{locale}.json`
4. Components use `useTranslations("namespace")` hook for translations

### RTL Support
- HTML `dir` attribute toggles between `ltr` and `rtl`
- **Vazirmatn** font loaded for Farsi, **Geist** for English
- CSS uses logical properties (`ms-`, `me-`, `start-`, `end-`) for spacing
- Custom `.rtl-flip` class mirrors arrows in RTL
- `[dir="rtl"]` selectors handle grid backgrounds and cursor positioning

### Translation Structure (`messages/en.json` / `fa.json`)
```json
{
  "metadata": { "title": "...", "description": "..." },
  "nav": { "home": "...", "switchLang": "..." },
  "hero": { "greeting": "...", "terminal": { "commands": [...] } },
  "about": { "bio": "...", "frontend": "..." },
  "blog": { "title": "...", "minRead": "{time} min read" },
  "projects": { "viewDetails": "..." },
  "devops": { "deployTo": "Deploy to {platform}" },
  "admin": { ... },
  "footer": { "copyright": "© {year} ..." }
}
```

---

## Database Schema

### Enums
| Enum | Values |
|------|--------|
| `PostStatus` | `DRAFT`, `PUBLISHED`, `ARCHIVED` |
| `ProjectStatus` | `ACTIVE`, `ARCHIVED`, `FEATURED` |
| `TechCategory` | `LANGUAGE`, `FRAMEWORK`, `DATABASE`, `DEVOPS`, `TOOL`, `DESIGN` |
| `ExperienceType` | `WORK`, `EDUCATION`, `CERTIFICATION` |

### Core Models

```
User ──< Post (blog posts, bilingual)
     ──< Media (file uploads)

Category ──< PostCategory >── Post ──< PostTag

Project ──< ProjectTechStack >── TechStack
        ──< ProjectScreenshot
        ──< ProjectCaseStudy

Experience (work history, education, certifications)
SocialLink (social media links)
SiteConfig (key-value site settings)
```

### Key Design Decisions
- All content models are **bilingual** (`titleEn`/`titleFa`, `contentEn`/`contentFa`)
- **Soft deletes** via `deletedAt` on posts and projects
- Posts have **separate slugs** per language (`slugEn`/`slugFa`)
- Auth.js models (`Account`, `Session`, `User`, `VerificationToken`) follow the standard adapter schema

---

## Authentication

Configured in `src/lib/auth.ts` using Auth.js v5:

| Provider | Use Case |
|----------|---------|
| **GitHub OAuth** | Admin login via GitHub account |
| **Credentials** | Email/password login (bcrypt hashed) |

- JWT-based sessions (not database sessions)
- Role stored in JWT token (`role` field)
- Admin pages protected by `<AuthGuard>` component
- Sign-in page at `/admin`

---

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | Auth.js handler |
| `/api/posts` | GET/POST | List/create posts |
| `/api/posts/[id]` | GET/PATCH/DELETE | Post CRUD |
| `/api/projects` | GET/POST | List/create projects |
| `/api/projects/[id]` | GET/PATCH/DELETE | Project CRUD |
| `/api/categories` | GET/POST | List/create categories |
| `/api/upload` | POST | File upload (stores to `public/uploads/`) |

---

## Pages & Routing

### Public Pages
| Route | Description |
|-------|-------------|
| `/[locale]` | Home — hero, about, projects preview, blog preview, devops |
| `/[locale]/about` | About page |
| `/[locale]/blog` | Blog post list |
| `/[locale]/blog/[slug]` | Individual blog post (markdown rendered) |
| `/[locale]/projects` | Project showcase |
| `/[locale]/projects/[slug]` | Project detail with case study |

### Admin Pages (auth-protected)
| Route | Description |
|-------|-------------|
| `/[locale]/admin` | Dashboard overview |
| `/[locale]/admin/posts` | Post list + management |
| `/[locale]/admin/posts/new` | Create new post (bilingual editor) |
| `/[locale]/admin/posts/[id]/edit` | Edit existing post |
| `/[locale]/admin/projects` | Project list + management |
| `/[locale]/admin/projects/new` | Create new project |
| `/[locale]/admin/categories` | Category management |
| `/[locale]/admin/settings` | Site configuration |

---

## Components

### Layout (`src/components/layout/`)
| Component | Description |
|-----------|------------|
| `Header` | Sticky top nav with locale-aware links, mobile hamburger menu |
| `Footer` | Copyright + "built with" line |
| `LanguageSwitcher` | Toggles between EN/FA, updates URL prefix |

### Home Sections (`src/components/`)
| Component | Description |
|-----------|------------|
| `HeroSection` | Landing section with greeting, role, CTA buttons |
| `TerminalAnimation` | Typing animation simulating terminal commands |
| `AboutSection` | Bio, avatar placeholder, social links |
| `TechStackCard` | Grid of tech icons (frontend/backend/devops categories) |
| `ProjectsPreview` | 3-column grid of featured project cards |
| `BlogPreview` | 3-column grid of latest blog posts |
| `DevOpsSection` | Uptime widget + deploy badges |

### Blog (`src/components/blog/`)
| Component | Description |
|-----------|------------|
| `PostCard` | Card with title, excerpt, categories, date, reading time |
| `MarkdownContent` | Renders markdown via `next-mdx-remote/rsc` with syntax highlighting |

### Projects (`src/components/projects/`)
| Component | Description |
|-----------|------------|
| `ProjectCard` | Card with title, description, tech stack, GitHub stats |
| `GitHubStats` | Inline GitHub star/fork/language display |
| `ScreenshotCarousel` | Image carousel for project screenshots |

### Admin (`src/components/admin/`)
| Component | Description |
|-----------|------------|
| `AuthGuard` | Wraps admin pages, redirects to login if unauthenticated |
| `AdminShell` | Admin layout wrapper with sidebar |
| `Sidebar` | Admin navigation sidebar |

---

## Styling & Theme

### Design System — Cyberpunk Minimal
The theme uses a dark carbon background with neon green (`#00ff88`) and cyan (`#00e5ff`) accents.

#### Color Palette
| Token | Color | Usage |
|-------|-------|-------|
| `--carbon` | `#0a0a0f` | Background |
| `--carbon-light` | `#12121a` | Card backgrounds |
| `--carbon-lighter` | `#1a1a26` | Elevated surfaces |
| `--carbon-border` | `#2a2a3a` | Borders |
| `--neon` | `#00ff88` | Primary accent (green) |
| `--neon-cyan` | `#00e5ff` | Secondary accent |
| `--text-primary` | `#e0e0e8` | Headings |
| `--text-secondary` | `#8888a0` | Body text |
| `--text-muted` | `#55556a` | Metadata |

#### Typography
| Context | Font | Purpose |
|---------|------|---------|
| English body | Geist Sans | Primary UI font |
| Farsi body | Vazirmatn | Persian-optimized font (RTL) |
| Code/terminal | Geist Mono | Monospace for code blocks, terminal |

#### Visual Effects
- `.bg-grid` — Subtle grid background pattern
- `.scanline` — CRT scanline overlay on terminal
- `.glow-green` / `.glow-cyan` — Neon box-shadow glow
- `.text-glow-green` / `.text-glow-cyan` — Neon text-shadow
- `.flicker` — Neon flicker animation
- `.cursor-blink` — Terminal cursor blink
- `.prose-custom` — Markdown content styling (headings, code, lists, tables)

---

## Docker & Deployment

### Development (`docker-compose.dev.yml`)
```
app (hot-reload) + postgres:16 + redis:7
```
- Source mounted as volume for hot reload
- Default credentials: `postgres:postgres`, DB: `portfolio_dev`
- Ports: 3000 (app), 5432 (postgres), 6379 (redis)

### Production (`docker-compose.yml`)
```
app (standalone build) + postgres:16 + redis:7 + nginx:1.27 + certbot
```
- Nginx serves as reverse proxy with SSL
- Certbot auto-renews Let's Encrypt certificates
- App runs as standalone Next.js server
- Named volumes for database, redis, uploads, certs

---

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio_dev"

# Auth
AUTH_SECRET="change-me-in-production"
AUTH_URL="http://localhost:3000"

# GitHub OAuth (https://github.com/settings/developers)
GITHUB_ID=""
GITHUB_SECRET=""

# Redis
REDIS_URL="redis://localhost:6379"

# Docker Compose (Production)
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="change-me-in-production"
POSTGRES_DB="portfolio"

# Admin seed
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="changeme123"
```

---

## Getting Started

### Option 1: Docker (recommended)
```bash
cp .env.example .env
docker compose -f docker-compose.dev.yml up --build
docker exec portfolio-app-dev npx prisma db push
```

### Option 2: Local development
```bash
npm install
cp .env.example .env
# Start PostgreSQL and Redis separately
npx prisma db push
npm run dev
```

App runs at `http://localhost:3000`

### Useful commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Database GUI
npx prisma db push   # Sync schema to database
npx prisma db seed   # Seed admin user
```
