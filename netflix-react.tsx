import React, { useState, useEffect } from 'react';
import './Netflix.css';

export interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
}

export interface MovieCategories {
  [key: string]: Movie[];
}

export const Netflix: React.FC = () => {
  const [movies, setMovies] = useState<MovieCategories>({});
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      try {
        const movieData = await fetchMovies(); // from tmdb.js
        const groupedMovies = movieData.reduce((acc: MovieCategories, movie: Movie) => {
          if (!acc[movie.category]) {
            acc[movie.category] = [];
          }
          acc[movie.category].push(movie);
          return acc;
        }, {});
        
        setMovies(groupedMovies);
        setFeaturedMovie(movieData[0]);
      } catch (error) {
        setError('Failed to fetch movies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  return (
    <div className="netflix-container">
      {/* Featured Movie Section */}
      {featuredMovie && (
        <div className="featured-movie" style={{ backgroundImage: `url(${featuredMovie.imageUrl})` }}>
          <div className="featured-content">
            <h1>{featuredMovie.title}</h1>
            {/* Add additional featured movie content here */}
          </div>
        </div>
      )}

      {/* Movie Categories */}
      {Object.entries(movies).map(([category, movieList]: [string, Movie[]]) => (
        <div key={category} className="movie-row">
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          <div className="movies-slider">
            {movieList.map((movie: Movie) => (
              <div key={movie.id} className="movie-card">
                <img src={movie.imageUrl} alt={movie.title} />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Netflix;