import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Movie {
  id: number;
  title: string;
  // extend with other fields from your MoviesTitleDTO if needed
}

type RecommendationType = 'item' | 'user' | 'hybrid';

/**
 * Fetches full movie recommendations using external recommendation system
 * and your .NET backend to retrieve movie details.
 * 
 * @param movieId - A numeric movie ID (e.g., "5003")
 * @param type - Type of recommendation: 'item', 'user', or 'hybrid'
 * @returns Full movie data for the recommended items
 */
export const fetchMovieRecommendations = async (
  movieId: string,
  type: RecommendationType
): Promise<Movie[]> => {
  const externalEndpoint = `https://cine-niche-api-414.onrender.com/recommend/${type}/s${movieId}`;

  try {
    // 1. Hit external recommender API
    const externalResponse = await axios.get(externalEndpoint);
    const rawRecs: string[] = externalResponse.data?.recommendations ?? [];

    // 2. Clean up movie IDs (remove the 's' prefix)
    const cleanedIds = rawRecs
      .map(id => id.replace(/^s/i, ''))
      .map(id => parseInt(id, 10))
      .filter(id => !isNaN(id));

    if (!cleanedIds.length) {
      return [];
    }

    // 3. Request full movie info from your .NET API
    const backendResponse = await axios.get(`${BASE_URL}/Movie/GetRecommendations`, {
      params: {
        movieIds: cleanedIds
      },
      paramsSerializer: params => {
        return params.movieIds.map((id: number) => `movieIds=${id}`).join('&');
      },
      withCredentials: true // 👈 THIS IS CRITICAL
    });    

    return backendResponse.data;
  } catch (error) {
    console.error(`Failed to fetch ${type} recommendations:`, error);
    return [];
  }
};
