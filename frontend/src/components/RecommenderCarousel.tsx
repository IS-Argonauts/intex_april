import React, { useEffect, useRef, useState } from 'react';
import { MoviesTitle as Movie } from '../types/MoviesTitles';
import MovieCardSkeleton from './MovieCardSkeleton';
import MovieCard from './MovieCard';
import { Box, Typography } from '@mui/material';

interface RecommendationCarouselProps {
  title: string;
  recommenderType: string;
  genre?: string;
  director?: string;
  searchQuery?: string;
}

const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({
  title,
  recommenderType,
  genre,
  director,
  searchQuery,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 260 + 16;
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchRecommendations = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const queryParams = new URLSearchParams({
        type: recommenderType,
        userId,
      });

      if (genre) queryParams.append('genre', genre);
      if (director) queryParams.append('director', director);
      if (searchQuery) queryParams.append('search', searchQuery);

      try {
        const res = await fetch(`/api/recommendations?${queryParams.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch recommendations');

        const data = await res.json();
        const normalized = data.map((movie: any) => ({
          ...movie,
          id: Number(movie.id),
        }));

        setMovies(normalized);
      } catch (error) {
        console.error('Recommendation fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [recommenderType, genre, director, searchQuery]);

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

      <Box
        ref={carouselRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <MovieCardSkeleton key={i} />)
          : movies.map((movie) => (
              <MovieCard
                key={movie.showId}
                movie={movie}
                brokenImages={brokenImages}
                setBrokenImages={setBrokenImages}
              />
            ))}
      </Box>
    </Box>
  );
};

export default RecommendationCarousel;
