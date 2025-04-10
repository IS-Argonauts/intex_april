import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MainNavbar from '../components/MainNavbar/MainNavbar';
import CinePagination from '../components/CinePagination';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import ClearIcon from '@mui/icons-material/Clear';
import { deleteMovie, fetchAllMovies } from '../api/movies';
import { MoviesTitle as Movie, MoviesTitle } from '../types/MoviesTitles';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditMovieForm';

function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function AdminPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 400);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<MoviesTitle | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchAllMovies(pageNum, pageSize, debouncedSearch);
        setMovies(data.movies);
        setTotalCount(data.totalCount);
        setTotalPages(Math.ceil(data.totalCount / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageNum, pageSize, debouncedSearch]);

  if (error) {
    return (
      <>
        <MainNavbar />
        <Box sx={{ padding: 4 }}>
          <Typography color="error">Error: {error}</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <MainNavbar />
      <Box sx={{ padding: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4">Admin Movie Manager</Typography>
          {!showForm && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FCD076',
                color: '#000000',
                '&:hover': {
                  backgroundColor: '#e6ba64',
                },
              }}
              onClick={() => {
                setShowForm(true);
                setEditingMovie(null); // 👈 close edit form if open
              }}
            >
              ➕ Add New Movie
            </Button>
          )}
        </Box>
        {showForm && (
          <Box sx={{ mb: 3 }}>
            <NewMovieForm
              onSuccess={() => {
                setShowForm(false);
                fetchAllMovies(pageNum, pageSize, debouncedSearch).then(
                  (data) => {
                    setMovies(data.movies);
                    setTotalCount(data.totalCount);
                    setTotalPages(Math.ceil(data.totalCount / pageSize));
                  }
                );
              }}
              onCancel={() => setShowForm(false)}
            />
          </Box>
        )}

        {editingMovie && (
          <EditMovieForm
            movie={editingMovie}
            onCancel={() => setEditingMovie(null)}
            onSuccess={() => {
              setEditingMovie(null);
              fetchAllMovies(pageNum, pageSize, debouncedSearch).then(
                (data) => {
                  setMovies(data.movies);
                  setTotalCount(data.totalCount);
                  setTotalPages(Math.ceil(data.totalCount / pageSize));
                }
              );
            }}
          />
        )}

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

        <Typography sx={{ color: '#FCD076', mb: 2 }}>
          🎬 Total Movies: {totalCount}
        </Typography>

        {movies.map((movie) => (
          <Box
            key={movie.showId}
            sx={{
              backgroundColor: '#121212',
              color: 'white',
              padding: 2,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              marginBottom: 2,
            }}
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              style={{
                width: 80,
                height: 120,
                objectFit: 'cover',
                borderRadius: 4,
              }}
              onError={(e) => {
                e.currentTarget.src =
                  'https://mlworkspace9652940464.blob.core.windows.net/movieposters/placeHolder.jpg';
              }}
            />

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">{movie.title}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {movie.releaseYear ?? 'Year N/A'} ·{' '}
                {movie.director ?? 'Unknown'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                sx={{
                  color: '#FCD076',
                  '&:hover': {
                    backgroundColor: 'rgba(252, 208, 118, 0.1)',
                  },
                }}
                onClick={() => setEditingMovie(movie)}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                color="error"
                onClick={async () => {
                  if (movie.id === undefined || movie.id === null) {
                    console.error('Movie ID is missing');
                    return;
                  }

                  const confirmDelete = window.confirm(
                    `Are you sure you want to delete "${movie.title}"?`
                  );
                  if (!confirmDelete) return;

                  try {
                    await deleteMovie(movie.id);
                    // Refresh the list
                    const data = await fetchAllMovies(
                      pageNum,
                      pageSize,
                      debouncedSearch
                    );
                    setMovies(data.movies);
                    setTotalCount(data.totalCount);
                    setTotalPages(Math.ceil(data.totalCount / pageSize));
                  } catch (error) {
                    console.error('Failed to delete movie:', error);
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}

        <CinePagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
        />
      </Box>
    </>
  );
}

export default AdminPage;
