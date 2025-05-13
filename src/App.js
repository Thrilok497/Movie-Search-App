import React, { useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  const searchMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();
      setMovies(data.results || []);
      if (!data.results.length) setError("No results found.");
    } catch (err) {
      setError("Error fetching movies.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      {/* Header Section */}
      <header>
        <h1>🎬 Movie Search</h1>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
        </button>
      </header>

      {/* Search Section */}
      <div className="search">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {/* Loading, Error and Movie List */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
        ))}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default App;
