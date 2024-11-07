import React from 'react';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie" data-imdbid={movie.imdbID} onClick={() => onClick(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} loading="lazy" />
      <h3>{movie.Title}</h3>
      <h4>({movie.Year})</h4>
    </div>
  );
};

export default MovieCard;