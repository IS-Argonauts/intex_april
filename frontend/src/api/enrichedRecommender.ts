// enrichedRecommender.ts
import { MoviesTitle } from '../types/MoviesTitles';

export interface RecommendationMovie {
  show_id: string;
  hybrid_score: number;
  title: string;
  director: string | null;
  genres: string[];
  critically_acclaimed: number;
  posterUrl?: string;
}

interface RecommenderResponse {
  user_id: string;
  recommendations: RecommendationMovie[];
}

interface RecommendationBuckets {
  moviesByTopDirector: MoviesTitle[];
  topComedies: MoviesTitle[];
  topAction: MoviesTitle[];
  topCriticallyAcclaimed: MoviesTitle[];
}

const BASE_URL = 'https://cine-niche-api-414.onrender.com';

const fetchAndAnalyzeRecommendations = async (
  userId: string
): Promise<RecommendationBuckets | null> => {
  try {
    const response = await fetch(`${BASE_URL}/recommend/enriched/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch enriched recommendations');

    const data: RecommenderResponse = await response.json();
    const movies = data.recommendations;

    const normalize = (m: RecommendationMovie): MoviesTitle => ({
      id: parseInt(m.show_id.replace(/^s/, '')) || 0,
      showId: m.show_id,
      title: m.title,
      director: m.director ?? undefined,
      genre: m.genres.join(', '),
      posterUrl: m.posterUrl ?? 'https://mlworkspace9652940464.blob.core.windows.net/movieposters/placeHolder.jpg',
    });

    const normalizedMovies = movies.map(normalize);

    const directorCount = normalizedMovies.reduce<Record<string, number>>((acc, m) => {
      if (m.director) acc[m.director] = (acc[m.director] || 0) + 1;
      return acc;
    }, {});
    const mostCommonDirector = Object.entries(directorCount).sort((a, b) => b[1] - a[1])[0]?.[0];

    return {
      moviesByTopDirector: normalizedMovies.filter((m) => m.director === mostCommonDirector),
      topComedies: normalizedMovies
        .filter((m) => (m.genre ?? '').toLowerCase().includes('comedy'))
        .slice(0, 10),
      topAction: normalizedMovies
        .filter((m) => (m.genre ?? '').toLowerCase().includes('action'))
        .slice(0, 10),
      topCriticallyAcclaimed: normalizedMovies
        .filter((m) => Number(m.criticallyAcclaimed) === 1)
        .slice(0, 10),
    };
  } catch (error) {
    console.error('❌ Error loading enriched recommendations:', error);
    return null;
  }
};

export default fetchAndAnalyzeRecommendations;
