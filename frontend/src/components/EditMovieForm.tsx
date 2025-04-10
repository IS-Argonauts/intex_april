import { useState } from 'react';
import { MoviesTitle } from '../types/MoviesTitles';
import { addMovie, updateMovie } from '../api/movies';

interface EditMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  movie: MoviesTitle;
}

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  const [formData, setFormData] = useState<MoviesTitle>({ ...movie });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.id === undefined || formData.id === null) {
      console.error('Movie ID is missing!');
      return;
    }

    try {
      await updateMovie(formData.id, formData);
      onSuccess();
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Movie</h2>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Type:
        <input
          type="text"
          name="type"
          value={formData.type || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Director:
        <input
          type="text"
          name="director"
          value={formData.director || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Release Year:
        <input
          type="number"
          name="releaseYear"
          value={formData.releaseYear || new Date().getFullYear()}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Genre:
        <select
          name="genre"
          value={formData.genre || ''}
          onChange={handleChange}
        >
          <option value="">Select a genre</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="documentary">Documentary</option>
          <option value="thriller">Thriller</option>
          <option value="horror">Horror</option>
          <option value="fantasy">Fantasy</option>
          <option value="anime">Anime</option>
          <option value="romance">Romance</option>
          <option value="kids">Kids</option>
          {/* Add more as needed */}
        </select>
      </label>

      <button type="submit">Update Movie</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditMovieForm;
