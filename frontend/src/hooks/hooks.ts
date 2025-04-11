// hooks.ts
import { useEffect, useState } from 'react';
import { fetchAllMovies, fetchAllRatings, fetchAllUsers, fetchMovieCount } from '../api/movies';
import { MoviesTitle as Movie } from '../types/MoviesTitles';


export const useAllRatings = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllRatings()
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { loading, error };
};

export const useAllUsers = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllUsers()
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { loading, error };
};

export const useAllMovies = (page: number, pageSize: number, search: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([fetchAllMovies(page, pageSize, search), fetchMovieCount()])
      .then(([, count]) => {
        setTotalCount(count);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load movies');
        setMovies([]);
        setTotalCount(0);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, search]);

  return { movies, totalCount, loading, error };
};
  
  
  