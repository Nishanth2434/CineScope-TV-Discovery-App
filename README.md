# CineScope - Discover your next favorite show.

CineScope is a responsive, accessible TV show discovery app built with React and the [TVMaze API](https://www.tvmaze.com/api). It lets users browse and search thousands of shows, view full details and episode lists, and save favorites — all client-side, with no backend or API key required.

Built as part of the CodingAtom Web Development Internship assessment.

🔗 **Live demo:** *add deployed URL here*
🔗 **Repository:** *add GitHub URL here*

## Features

- Browse and search live TV show data from TVMaze, with debounced search (300–500ms) to avoid firing a request per keystroke
- Detailed show pages with rating, genres, language, status, runtime, premiere date, official site, sanitized summary, and full episode list
- Favorites system persisted to `localStorage` — no login required
- Loading skeletons, error states with retry, and empty states across every page — the UI never shows a blank screen
- Request cancellation via `AbortController` so a slow, superseded search can't overwrite fresher results
- App-wide Error Boundary with a recoverable fallback UI
- Fully responsive from 320px mobile up through desktop, with keyboard navigation, visible focus states, and route-level focus management

## Tech Stack

- **React + Vite**
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Fetch API** for data fetching
- **TVMaze API** for show data (no key required)
- **localStorage** for favorites persistence
- No backend, no paid services, no state management library beyond React hooks/Context.

## API Used

[TVMaze API](https://www.tvmaze.com/api) — free, public, no authentication required.

| Purpose | Endpoint |
| --- | --- |
| List shows | `GET /shows` |
| Search shows | `GET /search/shows?q={query}` |
| Show details + episodes | `GET /shows/{id}?embed=episodes` |
| Episodes only | `GET /shows/{id}/episodes` |

All API calls are centralized in `src/services/tvmaze.js` rather than scattered across components.

## Routes

| Route | Description |
| --- | --- |
| `/` | Home — hero, search, featured shows |
| `/shows` | Browse and search all shows |
| `/shows/:id` | Show details and episode list |
| `/favorites` | Saved favorite shows |
| `/about` | About the project |
| `*` | 404 page |

All routes support direct URL access, page refresh, and browser back/forward navigation.

## Project Structure

```text
src/
├── components/
│   ├── Navbar, Footer, ShowCard, ShowGrid
│   ├── SearchBar, FavoriteButton
│   └── LoadingSkeleton, ErrorMessage, EmptyState, ErrorBoundary
├── pages/
│   └── Home, Shows, ShowDetails, Favorites, About, NotFound
├── services/
│   └── tvmaze.js (all TVMaze API calls)
├── hooks/
│   └── useDebounce.js, useFavorites.js
├── utils/
│   └── helpers.js (includes HTML summary sanitizer)
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

## Installation & Running Locally

```bash
git clone https://github.com/<your-username>/cinescope-tv-explorer.git
cd cinescope-tv-explorer
npm install
npm run dev
```

Build for production:
```bash
npm run build
npm run preview
```

## Accessibility

- Semantic HTML throughout (`nav`, `header`, `main`, `section`, `footer`)
- Logical heading hierarchy on every page
- All inputs labeled; all interactive elements are real buttons/links (no clickable divs)
- Visible focus indicators and full keyboard operability, including the mobile nav menu
- Descriptive alt text on all show images and aria-labels on icon-only controls (e.g. "Add Breaking Bad to favorites")
- Focus moves to the main heading on route change for screen reader users

## Performance

- Route-level code splitting with `React.lazy/Suspense`
- Lazy-loaded images below the fold, with fixed aspect-ratio containers and `object-fit` to prevent layout shift
- Debounced search and `AbortController` cancellation to avoid redundant network traffic
- Skeleton loaders sized to match final content, keeping the UI visually stable while data loads

## Lighthouse Results (mobile)

*Run `npx lighthouse <url> --preset=desktop` or use Chrome DevTools → Lighthouse (mobile throttling) and fill in actual scores below before publishing.*

| Category | Score |
| --- | --- |
| Performance | TBD |
| Accessibility | TBD |
| Best Practices | TBD |
| SEO | TBD |
| CLS | TBD |

## Error Handling

- Every API call is wrapped in try/catch with user-facing, friendly error messages (e.g. "Something went wrong while loading shows.") and a "Try Again" retry action
- Invalid show IDs resolve to a dedicated not-found state rather than a crash
- An app-wide React Error Boundary catches unexpected render errors and shows a "Something went wrong" fallback with a reload option, so the app never shows a blank white screen

## Request Cancellation

Every search and detail fetch is issued with an `AbortController`. If the user types a new search query, navigates away, or triggers a new request before the previous one resolves, the in-flight request is aborted. `AbortError` is caught and ignored rather than surfaced as a user-facing error, which prevents stale responses from overwriting newer results.

## Design Decisions

*Add your own notes here, e.g.:*
- Why Tailwind over plain CSS
- Why a service-layer abstraction for the API instead of calling fetch directly in components
- Why localStorage instead of a backend for favorites

## Challenges Faced

*Add 1–2 real challenges you hit while building, e.g. handling TVMaze's HTML-formatted summaries safely, or getting CLS under control with dynamically-sized images.*

## What I Learned

*Add a short, honest reflection — e.g. debounced search + AbortController patterns, accessibility-first component design, or Lighthouse-driven performance tuning.*

## Screenshots

*(Drag and drop your screenshots below!)*

**Home Page**
<!-- Drop Home Page screenshot here -->

**Search & Browse Shows**
<!-- Drop Shows Page screenshot here -->

**Show Details**
<!-- Drop Show Details screenshot here -->

**Favorites**
<!-- Drop Favorites screenshot here -->

**Mobile View**
<!-- Drop Mobile View screenshot here -->

---
Built with [TVMaze API](https://www.tvmaze.com/api). Not affiliated with TVMaze.
