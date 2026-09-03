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

React 19 SPA with Vite, React Router v7, and Tailwind CSS v4. This repo is the frontend only.

Stack around it:
- **Frontend** — this repo, built by Vite, deployed to GitHub Pages at `vobar.dev` (apex domain via `public/CNAME`).
- **Backend** — `vobar-backend`, a **Java** API self-hosted on the home server, behind
  Traefik at `https://api.vobar.dev`. Separate repo.
- **Database** — MongoDB 7.0 in Docker on the same server, reachable only over the
  internal `backend` network. Article ids are ObjectId **strings**, not numbers.

The API base URL comes from `VITE_API_URL` (see Environment variables). In local dev the Java backend runs at `http://localhost:8080/api`.

### Routing (`src/App.jsx`)

| Route | Component | Guard |
|---|---|---|
| `/` | `Portfolio` | public |
| `/login` | `Login` | public |
| `/posts` | `Posts` | public |
| `/posts/:id` | `PostDetail` | public |
| `/playground` | `Playground` | public |
| `/age-calculator` | `AgeCalculator` | public |
| `/admin` | `AdminDashboard` | `ProtectedRoute` |
| `/admin/posts` | `AdminPosts` | `ProtectedRoute` |
| `/admin/new-post` | `NewArticle` | `ProtectedRoute` |
| `/admin/edit-post/:id` | `NewArticle` | `ProtectedRoute` |
| `*` | `NotFound` | public |

`ProtectedRoute` reads from `AuthContext` — if no user, redirects to `/login`.

### Auth (`src/context/AuthContext.jsx`)

JWT token and user object stored in `localStorage`. `login()`/`logout()` functions provided via context. All admin API calls use `Authorization: Bearer <token>` headers via Axios.

### Public portfolio (`src/pages/Portfolio.jsx`)

Composes: `LoadingScreen` → `Home` → `About` → `PostsSection` → `PlaygroundSection` → `Contact` (all in `src/components/sections/`).

### Playground (`src/data/playground.js`)

Pet projects are a static list, not an API resource. Adding one means a single
entry in `src/data/playground.js`; `PlaygroundCard` renders it as an internal
`Link`, or as an external `<a target="_blank">` when `path` starts with `http`.
Rendered by `PlaygroundSection` on the portfolio (first 4) and by the
`/playground` page (all).

### Admin panel (`src/pages/admin/`)

`AdminDashboard` lists/deletes articles from the backend. `NewArticle` creates/edits articles (title, summary, content, tags, published toggle). Both call the Java backend via `${import.meta.env.VITE_API_URL}/articles`.

### Styling conventions

- Dark theme: bg `#0a0a0a`, gray body text, blue/cyan gradient accents on headings and CTAs
- Fonts: Space Grotesk (body) + JetBrains Mono (code/logo) — loaded via Google Fonts in `index.html`
- Custom animations defined in `src/index.css`: `blink` (cursor), `loading-bar`, `reveal` (scroll fade-in)
- Scroll animations via `RevealOnScroll` component (Intersection Observer wrapper)

### Environment variables

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL of the Java backend, **including** the `/api` prefix. Dev: `http://localhost:8080/api`. Prod: `https://api.vobar.dev/api`. |
| `VITE_SERVICE_ID` | EmailJS — contact form |
| `VITE_TEMPLATE_ID` | EmailJS — contact form |
| `VITE_PUBLIC_KEY` | EmailJS — contact form |

Every `VITE_`-prefixed variable is **inlined into the production bundle at build time and is therefore public**. Real secrets belong on the Java backend, never here.

- **Local dev** — copy `.env.example` to `.env` and fill it in. `.env` is gitignored.
- **Deployed build** — the GitHub Actions workflow injects them into the build step. `VITE_API_URL` is a **repository variable**; the EmailJS trio are **repository secrets**. They must be repo-scoped, not scoped to the `github-pages` environment, because the `build` job does not declare that environment and would read them as empty strings.

If a `VITE_` var is missing at build time it does not fail — Vite compiles it to the literal string `undefined`, shipping requests to `undefined/articles`. Check the bundle if the deployed site can't reach the API.

## Known issues

- `NewArticle` form state includes a `tags` field but the input is not rendered in the UI
- EmailJS keys ship in the public bundle and the domain allowlist that would constrain them is a paid EmailJS feature. Long-term fix: move the contact form behind a `/api/contact` endpoint on the Java backend so the mail credential stays server-side.
