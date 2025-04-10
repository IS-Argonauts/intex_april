import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesTitle as Movie } from '../../types/MoviesTitles';
import { fetchMovieByShowId } from '../../api/movies';
import './MovieDetailsPage.css';

const MovieInfoSection: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const movieId = parseInt(id, 10);
    if (isNaN(movieId)) {
      setError('Invalid movie ID');
      return;
    }

    setLoading(true);
    setError(null);

    fetchMovieByShowId(movieId)
      .then(setMovie)
      .catch(() => setError('Movie not found or failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
    console.log(`User rated: ${rating} stars`);
  };

  if (error) return <div className="not-found">{error} 🫠</div>;
  if (loading || !movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-details-container">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="movie-poster"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            'https://mlworkspace9652940464.blob.core.windows.net/movieposters/placeHolder.jpg';
        }}
      />

      <div className="movie-info">
        <h1 className="movie-title">{movie.title}</h1>
        <p className="movie-subinfo">
          {movie.genre} • {movie.releaseYear} • Directed by {movie.director || 'Unknown'}
        </p>

        <div className="button-group">
          <button className="add-button">+ Add to List</button>
          <button className="watch-button">▶ Watch Movie</button>
        </div>

        <div className="description-box">
          <strong>Description:</strong>
          <p>{movie.description}</p>
        </div>

        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRatingClick(star)}
              className={`star ${star <= userRating ? 'active' : ''}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieInfoSection;
