import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import MovieCard from './MovieCard';
import Modal from './Modal';
import Spinner from './Spinner';
import Popup from './Popup';
import '../styles/MovieList.css';
import '../styles/Button.css';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentYear, setCurrentYear] = useState('2024');
  const apiKey = '20536129';

  useEffect(() => {
    fetchMovies(currentTitle, currentYear, 1);
  }, [currentTitle, currentYear]); // Include dependencies here

  const fetchMovies = async (title = '', year = '', page = 1) => {
    const searchTerm = title || 'movie';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}&type=movie&page=${page}${year ? `&y=${encodeURIComponent(year)}` : ''}`;

    setLoading(true);
    try {
      const response = await axios.get(url);
      const data = response.data;
      setLoading(false);
      if (data.Response === 'True') {
        setMovies((prevMovies) => (page === 1 ? data.Search : [...prevMovies, ...data.Search]));
      } else {
        if (page === 1) setMovies([]);  // Clear movies if initial fetch fails
        setError(data.Error);
      }
    } catch (err) {
      setLoading(false);
      setError('Failed to fetch movies');
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
    try {
      setLoading(true);
      const response = await axios.get(url);
      const data = response.data;
      setLoading(false);
      if (data.Response === 'True') {
        setSelectedMovie(data);
        setShowModal(true);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setLoading(false);
      setError('Failed to fetch movie details');
    }
  };

  const handleMovieClick = (imdbID) => {
    fetchMovieDetails(imdbID);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(currentTitle, currentYear, nextPage);
  };

  const handleSearch = (title, year) => {
    setCurrentTitle(title);
    setCurrentYear(year);
    setCurrentPage(1);
    setMovies([]); // Clear previous results
    fetchMovies(title, year, 1); // Fetch only the first page of results
  };

  const handleReset = () => {
    setCurrentTitle('');
    setCurrentYear('2024');
    setCurrentPage(1);
    setMovies([]); // Clear previous results
    fetchMovies('', '2024', 1); // Fetch only the first page of default results
  };

  return (
    <div>
      <Header onSearch={handleSearch} onReset={handleReset} />
      {loading && <Spinner />}
      {error && <Popup message={error} />}
      <div id="movies" className="main-content">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onClick={handleMovieClick} />
        ))}
      </div>
      <button onClick={handleLoadMore} className="button">Load More</button>
      {showModal && selectedMovie && <Modal movie={selectedMovie} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default MoviesList;