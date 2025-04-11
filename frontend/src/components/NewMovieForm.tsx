import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import { MoviesTitle } from '../types/MoviesTitles';
import { addMovie, updateMovie } from '../api/movies';

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: MoviesTitle | null;
}

const defaultFormState: MoviesTitle = {
  showId: '',
  type: '',
  title: '',
  director: '',
  cast: '',
  country: '',
  releaseYear: new Date().getFullYear(),
  rating: '',
  duration: '',
  description: '',
  action: 0,
  adventure: 0,
  animeSeriesInternationalTvShows: 0,
  britishTvShowsDocuseriesInternationalTvShows: 0,
  children: 0,
  comedies: 0,
  comediesDramasInternationalMovies: 0,
  comediesInternationalMovies: 0,
  comediesRomanticMovies: 0,
  crimeTvShowsDocuseries: 0,
  documentaries: 0,
  documentariesInternationalMovies: 0,
  docuseries: 0,
  dramas: 0,
  dramasInternationalMovies: 0,
  dramasRomanticMovies: 0,
  familyMovies: 0,
  fantasy: 0,
  horrorMovies: 0,
  internationalMoviesThrillers: 0,
  internationalTvShowsRomanticTvShowsTvDramas: 0,
  kids: 0,
  languageTvShows: 0,
  musicals: 0,
  natureTv: 0,
  realityTv: 0,
  spirituality: 0,
  tvAction: 0,
  tvComedies: 0,
  tvDramas: 0,
  talkShowsTvComedies: 0,
  thrillers: 0,
  criticallyAcclaimed: '',
  id: 0,
  genre: '',
  posterUrl: '',
};

const NewMovieForm: React.FC<NewMovieFormProps> = ({
  onSuccess,
  onCancel,
  initialData = null,
}) => {
  const [formData, setFormData] = useState<MoviesTitle>(initialData || defaultFormState);
  const [error, setError] = useState('');

  // 👀 Update form data when editing an existing movie
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.releaseYear || !formData.director) {
      setError('Title, Year, and Director are required');
      return;
    }

    try {
      if (initialData?.id) {
        await updateMovie(initialData.id, formData); // 🧩 Pass ID + full object
      } else {
        await addMovie({ ...formData, id: 0 });
      }
    
      setError('');
      onSuccess();
    } catch (err: any) {
      setError('Failed to save movie');
      console.error('Save error:', err);
    }
  };
    
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: '#1f1f1f',
        padding: 3,
        borderRadius: 2,
        border: '1px solid #555',
        color: 'white',
        mb: 3,
      }}
    >
      <Typography variant="h6" gutterBottom color="white">
        {initialData ? 'Edit Movie' : 'Add New Movie'}
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputProps={{ sx: { color: 'white' } }}
      />

      <TextField
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputProps={{ sx: { color: 'white' } }}
      />

      <TextField
        label="Director"
        name="director"
        value={formData.director}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputProps={{ sx: { color: 'white' } }}
      />

      <TextField
        label="Release Year"
        name="releaseYear"
        type="number"
        value={formData.releaseYear}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputProps={{ sx: { color: 'white' } }}
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        minRows={3}
        InputProps={{ sx: { color: 'white' } }}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel sx={{ color: 'white' }}>Genre</InputLabel>
        <Select
          name="genre"
          value={formData.genre}
          onChange={handleSelectChange}
          sx={{ color: 'white', backgroundColor: '#2a2a2a' }}
        >
          <MenuItem value="action">Action</MenuItem>
          <MenuItem value="comedy">Comedy</MenuItem>
          <MenuItem value="drama">Drama</MenuItem>
          <MenuItem value="documentary">Documentary</MenuItem>
          <MenuItem value="thriller">Thriller</MenuItem>
          <MenuItem value="horror">Horror</MenuItem>
          <MenuItem value="fantasy">Fantasy</MenuItem>
          <MenuItem value="anime">Anime</MenuItem>
          <MenuItem value="romance">Romance</MenuItem>
          <MenuItem value="kids">Kids</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          {initialData ? 'Update Movie' : 'Add Movie'}
        </Button>
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default NewMovieForm;
