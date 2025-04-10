import { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import MainNavbar from "../components/MainNavbar/MainNavbar";
import HeroBanner from "../components/HeroBanner";
import MovieFilters from "../components/MovieFilters";
import RecommenderCarousel from "../components/RecommenderCarousel";


const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [directors, setDirectors] = useState<string[]>([]);

  // Fake data for genres/directors (love that you liked this 😄)
  useEffect(() => {
    setGenres(['Action', 'Comedy', 'Drama', 'Horror', 'Romance']);
    setDirectors(['Christopher Nolan', 'Greta Gerwig', 'Steven Spielberg', 'Jordan Peele']);
  }, []);

  return (
    <>
      <MainNavbar />
      <HeroBanner
        name="" // Or get from user context/localStorage etc
        imageUrl="/tabs-bg.jpg" // Change this to a good one!
        />


        <MovieFilters
        genres={genres}
        genre={genre}
        setGenre={setGenre}
        />




      Carousels (filters not applied yet, but structure is ready!)
      <RecommenderCarousel
        title="Based on Your Likes"
        recommenderType="likes"
        genre={genre}
        director={director}
        searchQuery={searchQuery}
        />
      <RecommenderCarousel title="Drama Movies For You" recommenderType="history" />
      <RecommenderCarousel title="Action Movies For You" recommenderType="history" />
      <RecommenderCarousel title="Horror Movies For You" recommenderType="history" />
      <RecommenderCarousel title="Trending" recommenderType="ratings" />
      <RecommenderCarousel title="Critically Acclaimed" recommenderType="history" />
      <RecommenderCarousel title="My List" recommenderType="history" />

      <Footer />
    </>
  );
};

export default HomePage;