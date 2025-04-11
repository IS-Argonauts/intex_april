import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoviesTitle as Movie } from '../types/MoviesTitles';
import { fetchMovieRecommendations } from '../api/recommender';
import { Box, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface RecommendationCarouselProps {
  title: string;
  recommenderType: 'user' | 'item' | 'hybrid';
  genre?: string;
  director?: string;
  searchQuery?: string;
  moviesOverride?: Movie[];
}

const CARD_WIDTH = 290; // Just change this if you want!
const CARD_HEIGHT = 410;
const CARD_GAP = 24;
const SCROLL_STEP = 400; // pixels per arrow click

const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({
  title,
  recommenderType,
  genre,
  director,
  searchQuery,
  moviesOverride,
}) => {
  const [movies, setMovies] = useState<Movie[]>(moviesOverride ?? []);
  const [loading, setLoading] = useState(!moviesOverride);
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (moviesOverride) {
      setMovies(moviesOverride);
      setLoading(false);
      return;
    }

    const userId = localStorage.getItem('userId') ?? '5003';

    const fetchFromAPI = async () => {
      try {
        const data = await fetchMovieRecommendations(userId, recommenderType);
        setMovies(data);
      } catch (error) {
        console.error('Recommendation fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFromAPI();
  }, [recommenderType, genre, director, searchQuery, moviesOverride]);

  const scrollBy = (amount: number) => {
    carouselRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <Box sx={{ padding: 4, bgcolor: 'black', position: 'relative' }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
        {title}
      </Typography>

      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={() => scrollBy(-SCROLL_STEP)}
          sx={{
            position: 'absolute',
            left: -16,
            zIndex: 2,
            backgroundColor: 'rgba(0,0,0,0.6)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
          }}
        >
          <ChevronLeftIcon sx={{ color: 'white' }} />
        </IconButton>

        <Box
          ref={carouselRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: `${CARD_GAP}px`,
            scrollBehavior: 'smooth',
            paddingX: 2,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    backgroundColor: '#333',
                    borderRadius: '8px',
                  }}
                />
              ))
            : movies.map((movie) => (
                <Box
                  key={movie.id}
                  onClick={() => navigate(`/movies/${movie.id}`)}
                  sx={{
                    minWidth: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    backgroundColor: '#1A1A1A',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    flexShrink: 0,
                    border: '2px solid transparent',
                    transition: '0.2s',
                    '&:hover': {
                      border: '2px solid white',
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                    },
                    position: 'relative',
                  }}
                >
                  <Box
                    component="img"
                    src={movie.posterUrl}
                    alt={movie.title}
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://mlworkspace9652940464.blob.core.windows.net/movieposters/placeHolder.jpg';
                    }}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      color: 'white',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      padding: '6px',
                    }}
                  >
                    {movie.director || 'Unknown'} · {movie.releaseYear || 'N/A'}
                  </Box>
                </Box>
              ))}
        </Box>

        <IconButton
          onClick={() => scrollBy(SCROLL_STEP)}
          sx={{
            position: 'absolute',
            right: -16,
            zIndex: 2,
            backgroundColor: 'rgba(0,0,0,0.6)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
          }}
        >
          <ChevronRightIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RecommendationCarousel;

