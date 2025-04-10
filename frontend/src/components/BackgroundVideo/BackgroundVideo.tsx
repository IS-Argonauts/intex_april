import React from 'react';
import './BackgroundVideo.css';

const BackgroundVideo: React.FC = () => {
  return (
    <div className="video-background">
      <video autoPlay muted loop playsInline className="video-content">
        <source src="/videos/LandingPageVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay" />
    </div>
  );
};

export default BackgroundVideo;
