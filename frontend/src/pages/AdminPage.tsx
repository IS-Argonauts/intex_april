import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputBase,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

import MainNavbar from '../components/MainNavbar/MainNavbar';
import CinePagination from '../components/CinePagination';
import { deleteMovie, fetchAllMovies } from '../api/movies';
import { MoviesTitle as Movie } from '../types/MoviesTitles';
import NewMovieForm from '../components/NewMovieForm';
import '../components/AdminPage.css';

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
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 400);
  const inputRef = useRef<HTMLInputElement>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  const refreshMovies = async () => {
    const data = await fetchAllMovies(pageNum, pageSize, debouncedSearch);
  
    const normalized = data.movies.map((movie) => ({
      ...movie,
      id: Number(movie.id ?? movie.showId) || 0, // fallback to 0 if bad
    }));
    
  
    if (normalized.length === 0 && pageNum > 1) {
      setPageNum((prev) => prev - 1);
      return;
    }
  
    setMovies(normalized); // ✅ Make sure `setMovies` is defined above
    setTotalCount(data.totalCount);
    setTotalPages(Math.ceil(data.totalCount / pageSize));
  };
  

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        await refreshMovies();
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
        <Box className="admin-container">
          <Typography color="error">Error: {error}</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <MainNavbar />
      <Box className="admin-container">
        {/* Header + Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 1,
          }}
        >
          <Typography
            className="admin-title"
            component="h1"
            variant="h3"
            sx={{ color: 'white', fontWeight: 'bold', fontSize: '3rem' }}
          >
            Admin Movie Manager
          </Typography>

          {!showForm && (
            <Button
              variant="contained"
              className="add-movie-button"
              onClick={() => setShowForm(true)}
              sx={{
                backgroundColor: '#FCD076',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#e6ba64',
                },
              }}
            >
              ➕ Add New Movie
            </Button>
          )}
        </Box>

        {/* Total Movies */}
        <Typography
          sx={{
            color: '#FCD076',
            fontSize: '1.6rem',
            textAlign: 'center',
            fontWeight: 'bold',
            mt: 1,
            mb: 3,
          }}
        >
          🎬 Total Movies: {totalCount}
        </Typography>

        {/* Add Form */}
        {showForm && (
          <Box sx={{ mb: 3 }}>
            <NewMovieForm
              onSuccess={() => {
                setShowForm(false);
                refreshMovies();
              }}
              onCancel={() => setShowForm(false)}
            />
          </Box>
        )}

        {/* Search Bar */}
        <Box className="admin-search">
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

        {/* Movie List */}
        {movies.map((movie) => (
          <Box key={movie.id} className="admin-movie-row">
            {editingMovieId === movie.id ? (
              <NewMovieForm
                initialData={movie}
                onCancel={() => setEditingMovieId(null)}
                onSuccess={() => {
                  setEditingMovieId(null);
                  refreshMovies();
                }}
              />
            ) : (
              <>
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="admin-poster"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://mlworkspace9652940464.blob.core.windows.net/movieposters/placeHolder.jpg';
                  }}
                />
                <Box className="admin-movie-info">
                  <Typography variant="h5">{movie.title}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    {movie.releaseYear ?? 'Year N/A'} ·{' '}
                    {movie.director ?? 'Unknown'}
                  </Typography>
                </Box>
                <Box className="admin-actions">
                  <IconButton
                    sx={{ color: 'white' }}
                    onClick={() => setEditingMovieId(movie.id!)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className="delete-button"
                    onClick={() => {
                      setMovieToDelete(movie);
                      setShowDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </>
            )}
          </Box>
        ))}

        <CinePagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={(nextPage) => {
            // Ensure we never exceed totalPages - 1
            if (nextPage < 1 || nextPage >= totalPages) return;
            setPageNum(nextPage);
          }}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1); // reset to first page
          }}
        />


        {/* Delete Dialog */}
        <Dialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
        >
          <DialogTitle>❌ Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete{' '}
              <strong>"{movieToDelete?.title}"</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setShowDeleteDialog(false)}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!movieToDelete?.id) return;

                try {
                  await deleteMovie(movieToDelete.id);
                  setShowDeleteDialog(false);
                  setMovieToDelete(null);
                  refreshMovies();
                } catch (err) {
                  console.error('Failed to delete movie:', err);
                }
              }}
            >
              Confirm Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default AdminPage;
