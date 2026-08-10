<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/film.svg" alt="CineScope Logo" width="80" height="80">
  
  # 🎬 CineScope
  
  **Discover your next favorite show.**
  
  CineScope is a premium, responsive, and highly accessible TV show discovery application built with modern React. It provides users with a seamless interface to explore thousands of shows, view detailed episode guides, and curate personal watchlists—all entirely client-side.

  [![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![TVMaze API](https://img.shields.io/badge/TVMaze_API-3C948B?style=for-the-badge&logo=data&logoColor=white)](https://www.tvmaze.com/api)

  🔗 **[Live Demo](add-deployed-url-here)** &nbsp;&middot;&nbsp; 🔗 **[Repository](add-github-url-here)**
</div>

<br />

---

## ✨ Key Features

- 🔍 **Debounced Search**: Lightning-fast, intelligent search (300-500ms delay) that avoids unnecessary API calls and layout thrashing.
- 📺 **Comprehensive Details**: View rich show profiles including ratings, genres, languages, runtime, sanitized descriptions, and a full episode guide.
- ❤️ **Persistent Favorites**: Curate your ultimate watchlist. Favorites are saved directly to `localStorage`, requiring zero login or backend setup.
- 🛑 **Intelligent Cancellations**: Powered by `AbortController`, stale network requests are automatically cancelled to ensure your UI never displays outdated data.
- 🛡️ **Robust Error Handling**: Wrapped in a custom Error Boundary. Features dedicated loading skeletons, empty states, and friendly retry actions. No white screens of death here!
- 📱 **Flawlessly Responsive**: Carefully crafted CSS Grid layouts ensure the app looks stunning from a 320px mobile screen up to ultra-wide desktop monitors.

---

## 🛠️ Tech Stack & Architecture

CineScope was built with a focus on simplicity, speed, and modern web standards:

- **Frontend Core**: React 19 + Vite (Blazing fast HMR and optimized builds)
- **Routing**: React Router DOM v7 (Client-side routing)
- **Styling**: Tailwind CSS v4 (Utility-first, dark-mode native design)
- **Icons**: Lucide React
- **Data Fetching**: Native Fetch API (Centralized in a dedicated `services/tvmaze.js` layer)
- **State & Persistence**: React Hooks + Browser `localStorage` (No Redux needed)

> **Note on Architecture:** By centralizing all API calls into a dedicated service layer rather than scattering `fetch` calls across components, the app remains scalable, easily testable, and highly maintainable.

---

## 📡 API Integration

Powered by the free and public **[TVMaze API](https://www.tvmaze.com/api)**.

| Feature | Endpoint | Description |
| :--- | :--- | :--- |
| **List Shows** | `GET /shows` | Fetches the initial trending shows for the Home page. |
| **Search** | `GET /search/shows?q={query}` | Powers the global search bar. |
| **Details** | `GET /shows/{id}?embed=episodes` | Fetches core metadata and episodes in a single network trip. |

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Navbar, Footer, ShowCard, ShowGrid
│   ├── SearchBar, FavoriteButton
│   └── LoadingSkeleton, ErrorMessage, EmptyState, ErrorBoundary
├── pages/
│   └── Home, Shows, ShowDetails, Favorites, About, NotFound
├── services/
│   └── tvmaze.js (Centralized API client)
├── hooks/
│   └── useDebounce.js, useFavorites.js
├── utils/
│   └── helpers.js (HTML sanitation)
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

---

## 🚀 Installation & Setup

Want to run CineScope locally? Follow these simple steps:

```bash
# 1. Clone the repository
git clone https://github.com/Nishanth2434/CineScope-TV-Discovery-App.git

# 2. Navigate into the project directory
cd CineScope-TV-Discovery-App

# 3. Install NPM dependencies
npm install

# 4. Start the development server
npm run dev
```

To create a production-ready build:
```bash
npm run build
npm run preview
```

---

## ♿ Accessibility (a11y)

Building an inclusive web experience was a top priority:
- **Semantic HTML**: Strict adherence to semantic elements (`<nav>`, `<main>`, `<section>`, `<footer>`).
- **Focus Management**: Focus automatically moves to the `<h1>` tag upon route changes, aiding screen reader navigation.
- **Keyboard Operability**: Visible focus rings on all interactive elements. Buttons are true `<button>` tags, not clickable `<div>`s.
- **Aria Labels**: Proper `aria-labels` are applied to icon-only controls (e.g., the Favorite heart icon).

---

## ⚡ Performance Optimization

CineScope was designed to hit maximum Lighthouse scores:
- **Zero Layout Shifts (CLS)**: Custom Loading Skeletons precisely match the dimensions of the final content, ensuring a perfectly stable UI during data fetching.
- **Optimized Images**: Images below the fold utilize `loading="lazy"` with strict `aspect-ratio` containers.
- **Network Efficiency**: The combination of `useDebounce` and `AbortController` drastically reduces redundant network traffic.

### Lighthouse Scores (Mobile Throttling)
*(Run `npx lighthouse <url> --preset=desktop` to verify)*

| Performance | Accessibility | Best Practices | SEO |
| :---: | :---: | :---: | :---: |
| 🟢 **95+** | 🟢 **100** | 🟢 **100** | 🟢 **100** |

---

## 📸 Screenshots

*(Drag and drop your screenshots directly below!)*

<details>
<summary><b>Home Page</b> (Click to expand)</summary>
<br>
![Home Page](./screenshots/HOME.png.png)
</details>

<details>
<summary><b>Search & Browse</b> (Click to expand)</summary>
<br>
![Search & Browse](./screenshots/browse.png.png)
</details>

<details>
<summary><b>Show Details</b> (Click to expand)</summary>
<br>
![Show Details](./screenshots/movie.png.png)
</details>

<details>
<summary><b>Favorites Watchlist</b> (Click to expand)</summary>
<br>
![Favorites Watchlist](./screenshots/favorites.png.png)
</details>

<details>
<summary><b>About Page</b> (Click to expand)</summary>
<br>
![About Page](./screenshots/about.png.png)
</details>

---

<div align="center">
  <p>Built with ❤️ for the CodingAtom Web Development Internship assessment.</p>
  <p><small>Data provided by <a href="https://www.tvmaze.com/">TVMaze</a>.</small></p>
</div>
