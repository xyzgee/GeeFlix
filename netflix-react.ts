import React, { useState, useEffect } from 'react';
import './Netflix.css';

const Netflix = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  // Sample movie data - in a real app this would come from an API
  const sampleMovies = {
    trending: [
      { id: 1, title: 'Stranger Things', imageUrl: 'https://via.placeholder.com/300x450', category: 'Trending Now' },
      { id: 2, title: 'The Crown', imageUrl: 'https://via.placeholder.com/300x450', category: 'Trending Now' },
      { id: 3, title: 'Wednesday', imageUrl: 'https://via.placeholder.com/300x450', category: 'Trending Now' },
    ],
    originals: [
      { id: 4, title: 'Bridgerton', imageUrl: 'https://via.placeholder.com/300x450', category: 'Netflix Originals' },
      { id: 5, title: 'The Witcher', imageUrl: 'https://via.placeholder.com/300x450', category: 'Netflix Originals' },
      { id: 6, title: 'Shadow and Bone', imageUrl: 'https://via.placeholder.com/300x450', category: 'Netflix Originals' },
    ],
    popular: [
      { id: 7, title: 'Money Heist', imageUrl: 'https://via.placeholder.com/300x450', category: 'Popular' },
      { id: 8, title: 'Dark', imageUrl: 'https://via.placeholder.com/300x450', category: 'Popular' },
      { id: 9, title: 'The Queen\'s Gambit', imageUrl: 'https://via.placeholder.com/300x450', category: 'Popular' },
    ]
  };

  useEffect(() => {
    setMovies(sampleMovies);
    setFeaturedMovie(sampleMovies.trending[0]);
  }, []);

  return (
    <div className="netflix-container">
      <nav className="navbar">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix Logo" 
          className="netflix-logo"
        />
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#series">TV Shows</a>
          <a href="#movies">Movies</a>
          <a href="#new">New & Popular</a>
        </div>
      </nav>

      {featuredMovie && (
        <div className="featured-content" style={{
          backgroundImage: `url(${featuredMovie.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="featured-details">
            <h1>{featuredMovie.title}</h1>
            <div className="featured-buttons">
              <button className="play-button">▶ Play</button>
              <button className="more-info-button">ℹ More Info</button>
            </div>
          </div>
        </div>
      )}

      <div className="movies-sections">
        {Object.entries(movies).map(([category, movieList]) => (
          <div key={category} className="movie-row">
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className="movies-slider">
              {movieList.map(movie => (
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

      <style jsx>{`
        .netflix-container {
          background-color: #141414;
          min-height: 100vh;
          color: white;
        }

        .navbar {
          display: flex;
          align-items: center;
          padding: 20px 50px;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, transparent);
          position: fixed;
          width: 100%;
          z-index: 1000;
        }

        .netflix-logo {
          height: 25px;
          margin-right: 30px;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          margin-right: 20px;
        }

        .featured-content {
          height: 80vh;
          position: relative;
          padding: 200px 50px;
        }

        .featured-details {
          max-width: 500px;
        }

        .featured-buttons button {
          padding: 10px 20px;
          margin-right: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .play-button {
          background-color: white;
        }

        .more-info-button {
          background-color: rgba(109, 109, 110, 0.7);
          color: white;
        }

        .movies-sections {
          padding: 20px 50px;
        }

        .movie-row {
          margin-bottom: 40px;
        }

        .movies-slider {
          display: flex;
          overflow-x: auto;
          padding: 20px 0;
        }

        .movie-card {
          margin-right: 10px;
          position: relative;
          transition: transform 0.3s;
        }

        .movie-card:hover {
          transform: scale(1.1);
          z-index: 2;
        }

        .movie-card img {
          width: 200px;
          border-radius: 4px;
        }

        .movie-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 10px;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
        }

        .movie-info h3 {
          margin: 0;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default Netflix;
