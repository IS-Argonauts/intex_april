import { useState } from 'react';
import { MoviesTitle } from '../types/MoviesTitles';
import { addMovie } from '../api/movies';

interface NewMovieFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<MoviesTitle>({
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
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData: MoviesTitle = {
      ...formData,
      id: 0, // will be overridden by backend
      showId: '', // will be overridden by backend
      posterUrl: '', // auto-generated or handled by backend

      // 🧹 Make sure optional number fields are at least set to 0 or null
      action: formData.action ?? 0,
      adventure: formData.adventure ?? 0,
      animeSeriesInternationalTvShows:
        formData.animeSeriesInternationalTvShows ?? 0,
      // repeat for other genre/category fields if using Partial<>
    };

    await addMovie(cleanedData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>

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

      <button type="submit">Add Movie</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default NewMovieForm;
