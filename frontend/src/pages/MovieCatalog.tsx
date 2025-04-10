import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { MoviesTitle as Movie } from '../types/MoviesTitles';
import MainNavbar from '../components/MainNavbar/MainNavbar';
import { fetchAllMovies } from '../api/movies';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ClearIcon from '@mui/icons-material/Clear';

function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const MovieCatalog: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 400);
  const navigate = useNavigate();

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());
  const fetchedPages = useRef<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  // 🔄 Reset on search query change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchedPages.current.clear();
  }, [debouncedSearch]);

  // 📡 Fetch movies with search param
  const fetchMovies = useCallback(async () => {
    const key = `${page}-${debouncedSearch}`;
    if (fetchedPages.current.has(key)) return;

    setLoading(true);
    try {
      const response = await fetchAllMovies(page, 20, debouncedSearch);
      if (response && Array.isArray(response.movies)) {
        setMovies((prev) =>
          page === 1 ? response.movies : [...prev, ...response.movies]
        );
        fetchedPages.current.add(key);
      }
    } catch {
      setError('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  // 🔁 Infinite scroll
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => observer.current?.disconnect();
  }, [loading]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <>
      <MainNavbar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Movie Catalog
        </Typography>

        {/* 🔍 Search Input */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#1f1f1f',
            borderRadius: '24px',
            padding: '4px 12px',
            border: '1px solid #555',
            width: '320px',
            margin: 'auto',
          }}
        >
          <SearchIcon sx={{ color: '#aaa', mr: 1 }} />
          <InputBase
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            inputRef={inputRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter') inputRef.current?.blur();
            }}
            sx={{
              color: '#fff',
              '& input::placeholder': {
                color: '#aaa',
              },
            }}
          />
          {searchQuery && (
            <IconButton
              size="small"
              onClick={() => setSearchQuery('')}
              sx={{ color: '#aaa', ml: 1 }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        <br /><br />

        {error && <Typography color="error">{error}</Typography>}

        {!loading && movies.length === 0 && (
          <Typography sx={{ textAlign: 'center', mt: 4 }} color="textSecondary">
            No results found.
          </Typography>
        )}

        <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
          {movies.map((movie) => (
            <Card
              key={movie.showId}
              onClick={() => navigate(`/movies/${movie.showId}`)}
              sx={{
                width: 260,
                height: 400,
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#1A1A1A',
                transition: 'border 0.2s ease, box-shadow 0.2s ease',
                border: '2px solid transparent',
                '&:hover': {
                  border: '2px solid white',
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                },
              }}
            >
              <CardMedia
                component="img"
                image={movie.posterUrl}
                alt={movie.title}
                sx={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src =
                    'https://mlworkspace9652940464.blob.core.windows.net/movieposters/placeHolder.jpg';

                  setBrokenImages((prev) => new Set(prev).add(String(movie.showId)));
                }}
              />
              {brokenImages.has(String(movie.showId)) && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '6px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    zIndex: 2,
                  }}
                >
                  {movie.title}
                </Box>
              )}

              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: '10%',
                  backgroundColor: 'rgba(0,0,0,1)',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '4px',
                }}
              >
                <Typography variant="caption" sx={{ lineHeight: 1 }}>
                  {movie.director || 'Unknown Director'} · {movie.releaseYear || 'Year N/A'}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        <div ref={loadMoreRef} />
      </Box>
    </>
  );
};

export default MovieCatalog;
