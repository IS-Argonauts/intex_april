import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  IconButton,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
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

  const [genres] = useState<string[]>([
    'Action', 'Adventure', 'Anime', 'British', 'Comedies', 'Children',
    'Crime', 'Documentaries', 'Docuseries', 'Drama', 'Family Movies', 'Fantasy',
    'Horror', 'International', 'Kids', 'Language', 'Musicals', 'Nature',
    'Reality TV', 'Romantic', 'Spirituality', 'Thrillers'
  ]);
  const [genre, setGenre] = useState<string | ''>('');

  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());
  const fetchedPages = useRef<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchedPages.current.clear();
  }, [debouncedSearch, genre]);

  const fetchMovies = useCallback(async () => {
    const key = `${page}-${debouncedSearch}-${genre}`;
    if (fetchedPages.current.has(key)) return;

    setLoading(true);
    try {
      const response = await fetchAllMovies(page, 20, debouncedSearch, genre || undefined);
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
  }, [page, debouncedSearch, genre]);

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
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#000',
          minHeight: '100vh',
        }}
      >
        {/* Title & Filters */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Movie Catalog
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 2,
              mt: 1,
            }}
          >
            {/* Search Bar */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#1f1f1f',
                borderRadius: '28px',
                padding: '8px 20px',
                border: '2px solid #777',
                width: { xs: '100%', sm: '500px', md: '700px' },
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
                  fontSize: '1.1rem',
                  '& input::placeholder': {
                    color: '#aaa',
                    fontSize: '1.05rem',
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

            {/* Genre Dropdown */}
            <FormControl sx={{ minWidth: 200 }} size="medium">
              <InputLabel sx={{ color: 'white', fontSize: '1.4rem' }}>Genre</InputLabel>
              <Select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                label="Genre"
                sx={{
                  color: 'white',
                  backgroundColor: '#1f1f1f',
                  fontSize: '1.1rem',
                  '& .MuiSvgIcon-root': { color: 'white' },
                }}
              >
                <MenuItem value="">All Genres</MenuItem>
                {genres.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

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
              onClick={() => navigate(`/movies/${movie.id}`)}
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
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
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
