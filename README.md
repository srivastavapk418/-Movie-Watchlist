# 🎬 Movie Watchlist — React App

A modern **React** movie watchlist app that lets you search movies using the **OMDb API**, view their details, rate them using a **custom star rating system**, and add them to a **watched list** that persists using **localStorage**.  
Everything is **frontend-only**, built entirely with React hooks and reusable components.

---

## 🌐 Live Demo
[Visit App Here](https://your-vercel-deployed-link.vercel.app)

---

## ✨ Features

- 🔍 **Search Movies:** Fetch movie data dynamically from the OMDb API as you type.  
- 🎥 **Movie Details:** View cast, genre, release year, runtime, IMDb rating, and plot summary.  
- ⭐ **Custom Star Rating:** Rate movies interactively using a reusable `StarRating` component.  
- 🧾 **Add to Watchlist:** Add your favorite movies to a “Watched” list along with your personal rating.  
- 💾 **Persistent Data:** Watched list is saved in **localStorage** and auto-restored on reload.  
- 📊 **Statistics Summary:** See average IMDb rating, your average rating, and total runtime of all watched movies.  
- ⚡ **Optimized Search:** Uses `AbortController` to cancel outdated fetch requests when typing fast.  
- 🎨 **Responsive UI:** Clean, minimal, and user-friendly interface built with plain CSS.  
- 🧠 **Keyboard Shortcut:** Press “Enter” to focus the search bar instantly.

---

## 🧩 Tech Stack

- **React.js** (with Create React App)
- **JavaScript (ES6+)**
- **CSS3**
- **PropTypes**
- **OMDb API** for movie data
- **LocalStorage** for client-side persistence

---

## 📸 Screenshots
<img width="1920" height="855" alt="Screenshot (84)" src="https://github.com/user-attachments/assets/f643ad59-96f4-4e1f-a378-77cf7890bae4" />
<img width="1920" height="847" alt="Screenshot (85)" src="https://github.com/user-attachments/assets/926de60b-fe88-465a-8d2e-87f914fddff3" />
<img width="1920" height="850" alt="Screenshot (86)" src="https://github.com/user-attachments/assets/2351ca0f-47ed-433b-8b37-b8ca6417f777" />

---

## 🧩 What I used
- **API**: [OMDb API (Open Movie Database)](http://www.omdbapi.com/)  
  - The project uses the OMDb endpoints:
    - Search: `http://www.omdbapi.com/?apikey=${key}&s=${query}`
    - Details: `http://www.omdbapi.com/?apikey=${key}&i=${imdbID}`
  - A demo API key is stored in the project files (`key = "65340229"`).

---

## 🔎 Unique / notable implementation details
- **Custom hooks**
  - `useMovies(query, callback)` handles searching movies and includes:
    - Loading and error state
    - `AbortController` to cancel previous fetch when `query` changes
    - Returns `{ movies, isLoading, error }`
  - `useLocalStorageState(initial, key)` abstracts persisting state into `localStorage` and restores state on init.
  - `useKey` is used to add keyboard shortcuts (e.g., focusing search).
- **StarRating component** (`StarRating`) — reusable component to pick a rating (with PropTypes).
- **Watched summary** calculates averages using functional array helpers and displays a compact overview (IMDb rating, your rating, runtime).
- **Graceful error & loading UI** using `Loader` and `ErrorMessage` components.
- **Modular structure** — components like `MoviesList`, `MovieDetails`, `WatchedMoviesList`, `WatchedMoviesSummary`, `Search`, etc., make the app easy to navigate and maintain.

---

## ✅ Usage
- Type a movie title in the search box and press Enter (or use the search button).
- Click a movie item to open detailed info, rate it, and add it to your watched list.
- Visit the "Watched" area to see your rated movies and summary stats.
- Data in the watched list is saved to localStorage so it persists across reloads.

---

## 🧠 Inspiration
This project was built to practice React component design, state management, and real-world logic handling — all while creating a fun and interactive way.

---

Made with ❤️ by **Prateek** using React
