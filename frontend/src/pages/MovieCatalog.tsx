import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar/MainNavbar';
import { fetchAllMovies } from '../api/movies';
import { Movie } from '../api/movies';

// 🌀 Custom Hook: Debounce
function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

const MovieCatalog: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

  const debouncedSearch = useDebounce(searchQuery);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const fetchedPages = useRef<Set<string>>(new Set());
  const navigate = useNavigate();

  // 🔁 Reset state on search change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchedPages.current.clear();
  }, [debouncedSearch]);

  // 📡 Fetch Movie Data
  const fetchMovies = useCallback(async () => {
    const key = `${page}-${debouncedSearch}`;
    if (fetchedPages.current.has(key)) return;

    setLoading(true);
    try {
      const data = await fetchAllMovies(page, 20, debouncedSearch);
      const valid = data.filter((m): m is Movie => m && typeof m.id === 'number');
      setMovies((prev) => (page === 1 ? valid : [...prev, ...valid]));
      fetchedPages.current.add(key);
    } catch (err) {
      console.error(err);
      setError('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  // 📏 Infinite Scroll Observer
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setPage((prev) => prev + 1);
    }, { threshold: 1 });

    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);
    return () => observer.current?.disconnect();
  }, [loading]);

  // 🎬 Fetch on Mount / Scroll
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <>
      <MainNavbar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Movie Catalog</Typography>

        {/* 🔎 Search */}
        <Box mb={3} display="flex" justifyContent="center">
          <TextField
            variant="outlined"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: '300px' }}
          />
        </Box>

        {error && <Typography color="error">{error}</Typography>}

        {/* 🎥 Movie Grid */}
        <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              onClick={() => navigate(`/movies/${movie.id}`)}
              sx={{
                width: 260,
                height: 400,
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#1A1A1A',
                cursor: 'pointer', // 👈 important
                transition: 'transform 0.2s ease, border 0.2s ease, box-shadow 0.2s ease',
                border: '2px solid transparent',
                '&:hover': {
                  border: '2px solid white',
                  boxShadow: '0 0 8px rgba(255,255,255,0.5)',
                  transform: 'scale(1.03)', // 👈 adds a nice hover feel
                },
              }}
            >          
              <CardMedia
                component="img"
                image={movie.posterUrl}
                alt={movie.title}
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://mlworkspace9652940464.blob.core.windows.net/movieposters/placeHolder.jpg';
                  setBrokenImages((prev) => new Set(prev).add(Number(movie.id)));
                }}
              />
              {brokenImages.has(Number(movie.id)) && (
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
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '4px',
                }}
              >
                <Typography variant="caption">
                  {movie.director || 'Unknown Director'} · {movie.releaseYear || 'Year N/A'}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>

        {/* 🔄 Loading Spinner */}
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
