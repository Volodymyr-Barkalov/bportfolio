# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint check
npm run deploy     # Build + push to GitHub Pages (gh-pages -d dist)
```

No test suite is configured — `npm run lint` is the only automated check.

## Architecture

React 19 SPA with Vite, React Router v7, and Tailwind CSS v4. Deployed to GitHub Pages. Expects a Node.js backend at `http://localhost:8080` for admin/auth features.

### Routing (`src/App.jsx`)

| Route | Component | Guard |
|---|---|---|
| `/` | `Portfolio` | public |
| `/login` | `Login` | public |
| `/admin` | `AdminDashboard` | `ProtectedRoute` |
| `/admin/new-article` | `NewArticle` | **unprotected** (known issue) |

`ProtectedRoute` reads from `AuthContext` — if no user, redirects to `/login`.

### Auth (`src/context/AuthContext.jsx`)

JWT token and user object stored in `localStorage`. `login()`/`logout()` functions provided via context. All admin API calls use `Authorization: Bearer <token>` headers via Axios.

### Public portfolio (`src/pages/Portfolio.jsx`)

Composes: `LoadingScreen` → `Home` → `About` → `Contact` (all in `src/components/sections/`). The Projects section exists but is hidden from nav.

### Admin panel (`src/pages/admin/`)

`AdminDashboard` lists/deletes articles from the backend. `NewArticle` creates/edits articles (title, summary, content, tags, published toggle). Both hit `http://localhost:8080/api/...` — this URL is hardcoded, not env-configured. The backend is Node.js (not Spring Boot).

### Styling conventions

- Dark theme: bg `#0a0a0a`, gray body text, blue/cyan gradient accents on headings and CTAs
- Fonts: Space Grotesk (body) + JetBrains Mono (code/logo) — loaded via Google Fonts in `index.html`
- Custom animations defined in `src/index.css`: `blink` (cursor), `loading-bar`, `reveal` (scroll fade-in)
- Scroll animations via `RevealOnScroll` component (Intersection Observer wrapper)

### Environment variables

EmailJS keys are in `.env` (committed):
```
VITE_SERVICE_ID
VITE_TEMPLATE_ID
VITE_PUBLIC_KEY
```

## Known issues

- `/admin/new-article` route is not wrapped in `ProtectedRoute`
- Backend API base URL (`http://localhost:8080`) is hardcoded across admin components — should move to an env variable
- `NewArticle` form state includes a `tags` field but the input is not rendered in the UI
