<div align="center">

<img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/film.svg" alt="CineScope logo" width="120" />

# 🎬 CineScope

### Discover your next favorite show — a responsive, client-side TV show discovery app.

<br/>

[![Live Website](https://img.shields.io/badge/🌐_Live_Website-Visit_Now-2563EB?style=for-the-badge&logoColor=white)](add-deployed-url-here)
[![Stars](https://img.shields.io/github/stars/Nishanth2434/CineScope-TV-Discovery-App?style=for-the-badge&color=F59E0B)](https://github.com/Nishanth2434/CineScope-TV-Discovery-App/stargazers)
[![Version](https://img.shields.io/badge/Version-1.0.0-6366F1?style=for-the-badge)](https://github.com/Nishanth2434/CineScope-TV-Discovery-App/releases)

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TVMaze API](https://img.shields.io/badge/TVMaze_API-3C948B?style=flat-square&logo=data&logoColor=white)](https://www.tvmaze.com/api)

</div>

---

## 🌐 Live Demo

<div align="center">

### Try the live website here 👇

<a href="add-deployed-url-here">
  <img src="https://img.shields.io/badge/🚀_LAUNCH_LIVE_APP-Live_Demo-2563EB?style=for-the-badge&logoColor=white" alt="Live Website" height="52" />
</a>

<br/><br/>

| Area                   | URL                                                  |
| :--------------------- | :--------------------------------------------------- |
| 🎬 CineScope App       | [add-deployed-url-here](add-deployed-url-here)       |
| 🐙 GitHub Repository   | https://github.com/Nishanth2434/CineScope-TV-Discovery-App |

</div>

---

## 📸 A Look Inside — CineScope

<div align="center">

<b>🏠 Home — featured shows and quick search</b>

<img src="./screenshots/HOME.png.png" alt="CineScope home page" width="100%" />

</div>

<table>
  <tr>
    <td width="50%"><b>🔍 Search & Browse Shows</b><br/><img src="./screenshots/browse.png.png" alt="Browse Shows page" /></td>
    <td width="50%"><b>❤️ Favorites Watchlist</b><br/><img src="./screenshots/favorites.png.png" alt="Favorites page" /></td>
  </tr>
</table>

<div align="center">

<b>📺 Show Details — comprehensive info, rating, and episode list</b>

<img src="./screenshots/movie.png.png" alt="Show Details page" width="100%" />

</div>

<table>
  <tr>
    <td width="50%"><b>ℹ️ About the Project</b><br/><img src="./screenshots/about.png.png" alt="About page" /></td>
  </tr>
</table>

---

## ✨ Features

<table>
  <tr>
    <td width="33%">
      <h3>🔍 Debounced Search</h3>
      Lightning-fast, intelligent search (300-500ms delay) that avoids unnecessary API calls and layout thrashing.
    </td>
    <td width="33%">
      <h3>📺 Comprehensive Details</h3>
      View rich show profiles including ratings, genres, languages, runtime, sanitized descriptions, and a full episode guide.
    </td>
    <td width="33%">
      <h3>❤️ Persistent Favorites</h3>
      Curate your ultimate watchlist. Favorites are saved directly to <code>localStorage</code>, requiring zero login or backend setup.
    </td>
  </tr>
  <tr>
    <td>
      <h3>🛑 Request Cancellations</h3>
      Powered by <code>AbortController</code>, stale network requests are automatically cancelled to ensure your UI never displays outdated data.
    </td>
    <td>
      <h3>🛡️ Robust Error Handling</h3>
      Wrapped in a custom Error Boundary. Features dedicated loading skeletons, empty states, and friendly retry actions. No white screens!
    </td>
    <td>
      <h3>📱 Responsive Design</h3>
      Mobile-first layouts — carefully crafted CSS Grid layouts ensure the app looks stunning from 320px mobile screens up to desktop.
    </td>
  </tr>
</table>

<details>
<summary><b>🤖 Accessibility & Performance Extras</b></summary>

- **Focus Management** — Focus automatically moves to the `<h1>` tag upon route changes, aiding screen reader navigation.
- **Semantic HTML** — Strict adherence to semantic elements (`<nav>`, `<main>`, `<section>`, `<footer>`).
- **Zero Layout Shifts (CLS)** — Custom Loading Skeletons precisely match the dimensions of the final content, ensuring a perfectly stable UI during data fetching.
- **Optimized Images** — Images below the fold utilize `loading="lazy"` with strict `aspect-ratio` containers.

</details>

---

## 🧰 Tech Stack

| Layer               | Technology                                                |
| :------------------ | :-------------------------------------------------------- |
| **Frontend**        | React 19 + Vite                                           |
| **Routing**         | React Router DOM v7                                       |
| **Styling**         | Tailwind CSS v4                                           |
| **Data Fetching**   | Fetch API (`src/services/tvmaze.js`)                      |
| **State Storage**   | Browser `localStorage`                                    |
| **Icons**           | Lucide React                                              |
| **HTML Sanitizer**  | DOMPurify                                                 |
| **Data Provider**   | TVMaze API (Public, no auth required)                     |

---

## 🏗️ Architecture

CineScope was built with a focus on simplicity, speed, and modern web standards. By centralizing all API calls into a dedicated service layer rather than scattering `fetch` calls across components, the app remains scalable, easily testable, and highly maintainable.

```text
React Components (Pages & Layout)
        ↓
Custom Hooks (useDebounce, useFavorites)
        ↓
Service Layer (services/tvmaze.js)
        ↓
External API (TVMaze)
```

```mermaid
flowchart TD
    U[User Browser] --> FE[React + React Router]
    FE --> API_Layer[TVMaze Service Layer]
    FE --> Storage[(localStorage)]
    API_Layer --> External_API[TVMaze Public API]
    External_API --> API_Layer
    Storage --> FE
```

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

<div align="center">
  <p>Built with ❤️ for the CodingAtom Web Development Internship assessment.</p>
  <p><small>Data provided by <a href="https://www.tvmaze.com/">TVMaze</a>.</small></p>
</div>
