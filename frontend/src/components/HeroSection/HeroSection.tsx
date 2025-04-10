import React from 'react';
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <div className="hero-container">
      <BackgroundVideo />

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">CineNiche</h1>
        <p className="hero-subtitle">cinema you won't find elsewhere</p>
      </div>
    </div>
  );
};

export default HeroSection;
