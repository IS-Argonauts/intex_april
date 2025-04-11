// hooks.ts
import { useEffect, useState } from 'react';
import {
  fetchAllMovies,
  fetchAllRatings,
  fetchAllUsers,
  fetchMovieCount,
  Rating,
  User,
} from '../api/movies';
import { MoviesTitle } from '../types/MoviesTitles';
import { parseMovieFromAPI } from '../utils/parseMovieFromAPI';

export const useAllRatings = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllRatings()
      .then(setRatings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { ratings, loading, error };
};

export const useAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
};

export const useAllMovies = (
  page: number,
  pageSize: number,
  search: string
) => {
  const [movies, setMovies] = useState<MoviesTitle[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([fetchAllMovies(page, pageSize, search), fetchMovieCount()])
      .then(([movieListRaw, count]) => {
        const parsedMovies = movieListRaw.map(parseMovieFromAPI);
        setMovies(parsedMovies);
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
