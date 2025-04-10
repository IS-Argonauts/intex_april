import { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import MainNavbar from '../components/MainNavbar/MainNavbar';
import HeroBanner from '../components/HeroBanner';
import MovieFilters from '../components/MovieFilters';
import RecommenderCarousel from '../components/RecommenderCarousel';
import { MoviesTitle as Movie } from '../types/MoviesTitles';
import { fetchMovieRecommendations } from '../api/recommender';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [directors, setDirectors] = useState<string[]>([]);

  const [likesMovies, setLikesMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [criticallyMovies, setCriticallyMovies] = useState<Movie[]>([]);
  const [myListMovies, setMyListMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setGenres(['Action', 'Comedy', 'Drama', 'Horror', 'Romance']);
    setDirectors(['Christopher Nolan', 'Greta Gerwig', 'Steven Spielberg', 'Jordan Peele']);
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId') ?? '5003';

    const loadAll = async () => {
      const [likes, drama, action, horror, trending, critical, myList] = await Promise.all([
        fetchMovieRecommendations(userId, 'user'),
        fetchMovieRecommendations(userId, 'user'),
        fetchMovieRecommendations(userId, 'user'),
        fetchMovieRecommendations(userId, 'user'),
        fetchMovieRecommendations(userId, 'item'),
        fetchMovieRecommendations(userId, 'hybrid'),
        fetchMovieRecommendations(userId, 'user')
      ]);

      setLikesMovies(likes);
      setDramaMovies(drama);
      setActionMovies(action);
      setHorrorMovies(horror);
      setTrendingMovies(trending);
      setCriticallyMovies(critical);
      setMyListMovies(myList);
    };

    loadAll();
  }, []);

  return (
    <>
      <MainNavbar />
      <HeroBanner name="" imageUrl="/tabs-bg.jpg" />

      <RecommenderCarousel title="Based on Your Likes" recommenderType="user" moviesOverride={likesMovies} />
      <RecommenderCarousel title="Drama Movies For You" recommenderType="user" moviesOverride={dramaMovies} />
      <RecommenderCarousel title="Action Movies For You" recommenderType="user" moviesOverride={actionMovies} />
      <RecommenderCarousel title="Horror Movies For You" recommenderType="user" moviesOverride={horrorMovies} />
      <RecommenderCarousel title="Trending Now" recommenderType="item" moviesOverride={trendingMovies} />
      <RecommenderCarousel title="Critically Acclaimed" recommenderType="hybrid" moviesOverride={criticallyMovies} />
      <RecommenderCarousel title="Your List" recommenderType="user" moviesOverride={myListMovies} />

      <Footer />
    </>
  );
};

export default HomePage;
