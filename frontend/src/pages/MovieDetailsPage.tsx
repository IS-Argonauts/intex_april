import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MovieInfoSection from '../components/MovieDetails/MovieInfoSection';
import MainNavbar from '../components/MainNavbar/MainNavbar';
import Footer from '../components/Footer/Footer';

const MovieDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <MainNavbar />

      {/* 🔙 Back Button */}
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
          marginBottom: '-12px', // Pull closer to MovieInfoSection
        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon style={{ marginRight: 8, color: '#FCD076' }} />
        Back
      </div>


      <main className="flex-grow px-4 pt-2 pb-8">
        <MovieInfoSection />
      </main>

      <Footer />
    </div>
  );
};

export default MovieDetailsPage;
