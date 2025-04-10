import { MoviesRating } from '../types/MoviesRating';
import { MoviesTitle } from '../types/MoviesTitles';
import { MoviesUser } from '../types/MoviesUser';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch paginated + filtered list of movies
export const fetchAllMovies = async (
  page: number,
  pageSize: number,
  searchQuery?: string
): Promise<{ movies: MoviesTitle[]; totalCount: number }> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (searchQuery?.trim()) {
      params.append('searchQuery', searchQuery.trim());
    }

    const url = `${BASE_URL}/Movie/AllMovies?${params.toString()}`;
    const response = await fetch(url, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();

    return {
      movies: data.movies,
      totalCount: data.totalCount,
    };
  } catch (error) {
    console.error('Error in fetchAllMovies:', error);
    throw error;
  }
};

// Fetch single movie by ID and parse genres
export const fetchMovieByShowId = async (id: number): Promise<MoviesTitle> => {
  const response = await fetch(`${BASE_URL}/Movie/SingleMovie?id=${id}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }

  const data = await response.json();

  const genres: string[] = Object.entries(data)
    .filter(([, value]) => typeof value === 'number' && value === 1)
    .map(([key]) => key.replace(/_/g, ' ').toLowerCase());

  return {
    ...data,
    posterUrl:
      data.posterUrl ??
      'https://mlworkspace9652940464.blob.core.windows.net/movieposters/placeHolder.jpg',
    genres,
  };
};

// Get all user ratings
export const fetchAllRatings = async (): Promise<MoviesRating[]> => {
  const response = await fetch(`${BASE_URL}/Movie/AllRatings`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch ratings');
  }
  return await response.json();
};

// Get all users
export const fetchAllUsers = async (): Promise<MoviesUser[]> => {
  const response = await fetch(`${BASE_URL}/Movie/AllUsers`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return await response.json();
};

// Get count of all movies
export const fetchMovieCount = async (): Promise<number> => {
  const response = await fetch(`${BASE_URL}/Movie/Count`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch movie count');
  }
  const data = await response.json();
  return data.total;
};

export const addMovie = async (newMovie: MoviesTitle): Promise<MoviesTitle> => {
  try {
    const response = await fetch(`${BASE_URL}/Movie/AddMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      throw new Error('Failed to add movie');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding movie', error);
    throw error;
  }
};

export const updateMovie = async (
  id: number,
  updatedMovie: MoviesTitle
): Promise<MoviesTitle> => {
  const response = await fetch(`${BASE_URL}/Movie/UpdateMovie/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedMovie),
  });

  if (!response.ok) {
    throw new Error('Failed to update movie');
  }

  // ✅ Only parse if response has content
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

export const deleteMovie = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/Movie/DeleteMovie/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
