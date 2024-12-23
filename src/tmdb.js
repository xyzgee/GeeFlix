const TMDB_API_KEY = '645f22b53075aa3d1488156cdd68e8a9';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};