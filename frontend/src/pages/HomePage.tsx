import { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import MainNavbar from '../components/MainNavbar/MainNavbar';
import HeroBanner from '../components/HeroBanner';
import RecommenderCarousel from '../components/RecommenderCarousel';
import { MoviesTitle as Movie } from '../types/MoviesTitles';
import { fetchMovieRecommendations } from '../api/recommender';

const HomePage: React.FC = () => {
  const [, setGenres] = useState<string[]>([]);
  const [, setDirectors] = useState<string[]>([]);

  const [likesMovies, setLikesMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setGenres(['Action', 'Comedy', 'Drama', 'Horror', 'Romance']);
    setDirectors(['Christopher Nolan', 'Greta Gerwig', 'Steven Spielberg', 'Jordan Peele']);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId') ?? '5003';

    const loadAll = async () => {
      const [likes, drama, action, horror] = await Promise.all([
        fetchMovieRecommendations(userId, 'user'),
        fetchMovieRecommendations('5003', 'item'),
        fetchMovieRecommendations('5004', 'item'),
        fetchMovieRecommendations('5007', 'item'),
      ]);

      setLikesMovies(likes);
      setDramaMovies(drama);
      setActionMovies(action);
      setHorrorMovies(horror);
    };

    loadAll();
  }, []);

  return (
    <>
      <MainNavbar />
      <HeroBanner imageUrl="/tabs-bg.jpg" />

      <RecommenderCarousel title="Based on Your Likes" recommenderType="user" moviesOverride={likesMovies} />
      <RecommenderCarousel title="What We Think You'll Like" recommenderType="user" moviesOverride={dramaMovies} />
      <RecommenderCarousel title="Similar to Your Favorite Directors" recommenderType="user" moviesOverride={actionMovies} />
      <RecommenderCarousel title="Trending Among Cinephiles" recommenderType="user" moviesOverride={horrorMovies} />

      <Footer />
    </>
  );
};

export default HomePage;
