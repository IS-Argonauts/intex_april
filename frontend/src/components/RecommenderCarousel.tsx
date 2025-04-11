import React, { useEffect, useRef, useState } from 'react';
import { MoviesTitle as Movie } from '../types/MoviesTitles';
import MovieCardSkeleton from './MovieCardSkeleton';
import MovieCard from './MovieCard';
import { Box, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { fetchMovieRecommendations } from '../api/recommender';

interface RecommendationCarouselProps {
  title: string;
  recommenderType: 'user' | 'item' | 'hybrid' | 'enriched';
  genre?: string;
  director?: string;
  searchQuery?: string;
  moviesOverride?: Movie[];
}

const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({
  title,
  recommenderType,
  genre,
  director,
  searchQuery,
  moviesOverride,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 260 + 16;
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (moviesOverride && moviesOverride.length > 0) {
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

  const handleScroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount * 3 : scrollAmount * 3,
      behavior: 'smooth',
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => handleScroll('left')}>
          <ChevronLeftIcon />
        </IconButton>

        <Box
          ref={carouselRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            scrollbarWidth: 'none',
            flexGrow: 1,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={i} />)
            : movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  brokenImages={brokenImages}
                  setBrokenImages={setBrokenImages}
                />
              ))}
        </Box>

        <IconButton onClick={() => handleScroll('right')}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RecommendationCarousel;
