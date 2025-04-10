import React from 'react';
import { Card, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MoviesTitle as Movie } from '../types/MoviesTitles';

interface MovieCardProps {
  movie: Movie;
  brokenImages: Set<number>;
  setBrokenImages: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, brokenImages, setBrokenImages }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/movies/${movie.id}`)}
      sx={{
        width: 260,
        height: 400,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1A1A1A',
        transition: 'border 0.2s ease, box-shadow 0.2s ease',
        border: '2px solid transparent',
        cursor: 'pointer',
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
          fontFamily: '"Josefin Sans", sans-serif',
        }}
        onError={(e) => {
          const target = e.currentTarget;
          target.onerror = null;
          target.src = 'https://mlworkspace9652940464.blob.core.windows.net/movieposters/placeHolder.jpg';
          if (movie.id !== undefined) {
            if (movie.id !== undefined) {
              setBrokenImages((prev) => {
                if (movie.id !== undefined) {
                  return new Set(prev).add(movie.id);
                }
                return prev;
              });
            }
          }
        }}
      />

      {movie.id !== undefined && brokenImages.has(movie.id) && (
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
            fontFamily: '"Josefin Sans", sans-serif',
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
        <Typography variant="caption" sx={{ lineHeight: 1, fontFamily: '"Josefin Sans", sans-serif' }}>
          {movie.director || 'Unknown Director'} · {movie.releaseYear || 'Year N/A'}
        </Typography>
      </Box>
    </Card>
  );
};

export default MovieCard;
