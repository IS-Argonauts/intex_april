import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MainNavbar from '../components/MainNavbar/MainNavbar';
import Footer from '../components/Footer/Footer';
import MovieInfoSection from '../components/MovieDetails/MovieInfoSection';
import RecommenderCarousel from '../components/RecommenderCarousel';
import { MoviesTitle as Movie } from '../types/MoviesTitles';
import { fetchMovieRecommendations } from '../api/recommender';

//const BACKEND_URL = import.meta.env.VITE_API_BASE_URL; // change for production
const BACKEND_URL = 'https://intex2-a6d7e5dnave8hzd5.canadacentral-01.azurewebsites.net';

const MovieDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [fallbackType, setFallbackType] = useState<string>('');

  useEffect(() => {
    const tryFetchWithFallbacks = async () => {
      if (!id || isNaN(Number(id))) {
        console.warn('Invalid movie ID');
        return;
      }

      const tryFetch = async (type: 'item' | 'hybrid' | 'user') => {
        try {
          const data = await fetchMovieRecommendations(id, type);
          if (data && data.length > 0) {
            setRecommendedMovies(data);
            setFallbackType(type);
            return true;
          }
        } catch (error) {
          console.warn(`❌ ${type} recommender failed:`, error);
        }
        return false;
      };

      const fallbackOrder: ('item' | 'hybrid' | 'user')[] = ['item', 'hybrid', 'user'];
      for (const type of fallbackOrder) {
        const success = await tryFetch(type);
        if (success) return;
      }

      // Final fallback — 17-spaced fallback
      const baseId = parseInt(id, 10);
      const spacedIds = Array.from({ length: 10 }, (_, i) => baseId + 17 + i * 17);

      try {
        const queryParams = spacedIds.map(mid => `movieIds=${mid}`).join('&');
        const res = await fetch(`${BACKEND_URL}/Movie/GetRecommendations?${queryParams}`);

        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setRecommendedMovies(data);
            setFallbackType('sequential');
          }
        }
      } catch (error) {
        console.error('⚠️ Final fallback (sequential) failed:', error);
      }
    };

    tryFetchWithFallbacks();
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <MainNavbar />

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '12px 16px',
          color: '#FCD076',
          fontSize: '1.1rem',
          fontWeight: 500,
          marginTop: '8px',
          marginBottom: '-12px',
        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon style={{ marginRight: 8, color: '#FCD076' }} />
        Back
      </div>

      <main className="flex-grow px-4 pt-2 pb-8">
        <MovieInfoSection />

        {recommendedMovies.length > 0 && (
          <RecommenderCarousel
            title={
              fallbackType === 'item'
                ? 'Because You Watched This'
                : fallbackType === 'hybrid'
                ? 'We Think You\'ll Like This'
                : fallbackType === 'user'
                ? 'Most Similar to What You Like'
                : 'Hand-Picked Discoveries'
            }
            recommenderType={fallbackType as any}
            moviesOverride={recommendedMovies}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MovieDetailsPage;
