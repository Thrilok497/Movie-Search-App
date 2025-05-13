import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function MovieCard({ movie, onClick }) {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="movie-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={posterUrl} alt={movie.title} />
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}

export default MovieCard;
