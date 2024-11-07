import React from 'react';
import '../styles/MovieDetail.css';

const MovieDetail = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="movie-detail">
      <h2>{movie.Title} ({movie.Year})</h2>
      <img src={movie.Poster} alt={`${movie.Title} poster`} style={{ width: '100%', maxWidth: '350px' }} />
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <div className="ratings">
        <strong>Ratings:</strong>
        <ul>
          {movie.Ratings && movie.Ratings.map((rating, index) => (
            <li key={index} className="rating-item">
              <span className="rating-source">{rating.Source}:</span>
              <span className="rating-value">{rating.Value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetail;