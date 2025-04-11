// lib/movies.ts

import { MoviesTitle as Movie } from '../types/MoviesTitles';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetches full movie data from backend given an array of numeric movie IDs.
 * Assumes API endpoint at /Movie/GetRecommendations?movieIds=...
 */
export const getMoviesByIds = async (ids: number[]): Promise<Movie[]> => {
  if (ids.length === 0) return [];

  const queryParams = ids.map(id => `movieIds=${id}`).join('&');
  const url = `${BASE_URL}/Movie/GetRecommendations?${queryParams}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch movies. Status: ${res.status}`);
    }

    const data: Movie[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error in getMoviesByIds:', error);
    return [];
  }
};
