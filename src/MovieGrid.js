import React, { useState, useEffect } from 'react';
import './MovieList.css';
import {fetchMovies} from './tmdb';

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const movieData = await fetchMovies();
        setMovies(movieData || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredMovies = movies.filter(movie =>
    (movie.title || movie.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="netflix-container">
      <nav className="navbar">
        <div className="netflix-logo">GEEFLIX</div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies..."
          className="search-input"
        />
      </nav>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title || movie.name || 'Movie poster'} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
              }}
            />
            <div className="movie-info">
              <h3>{movie.title || movie.name || 'Untitled'}</h3>
              <span className="rating">★ {movie.vote_average || 'N/A'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;