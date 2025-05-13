import React, { useEffect, useState } from "react";
import "./MovieModal.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function MovieModal({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
        );
        const data = await res.json();

        const youtubeTrailer = data.results.find(
          (vid) =>
            vid.site === "YouTube" &&
            (vid.type === "Trailer" || vid.type === "Teaser")
        );

        if (youtubeTrailer) {
          setTrailerKey(youtubeTrailer.key);
        }
      } catch (err) {
        console.error("Failed to load trailer:", err);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const youtubeUrl = trailerKey
    ? `https://www.youtube.com/watch?v=${trailerKey}`
    : "#";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>

        <img src={posterUrl} alt={movie.title} />
        <div className="modal-info">
          <h2>{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
          <p><strong>Overview:</strong></p>
          <p>{movie.overview || "No overview available."}</p>

          {trailerKey ? (
            <div className="trailer">
              <h3>Watch Trailer</h3>
              <iframe
                width="100%"
                height="300"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-btn"
              >
                Watch on YouTube
              </a>
            </div>
          ) : (
            <p style={{ color: "#999" }}>Trailer not available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
