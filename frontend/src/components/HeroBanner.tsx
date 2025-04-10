import React from 'react';
import { Box, Typography } from '@mui/material';

interface HeroBannerProps {
  name: string;
  imageUrl: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ name, imageUrl }) => {
  return (
    <Box
      sx={{
        height: { xs: '200px', md: '300px' },
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        mb: 5,
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, .8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            fontFamily: '"Josefin Sans", sans-serif',
          }}
        >
          Welcome, {name}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, fontFamily: '"Josefin Sans", sans-serif',  }}>
          curated for your obsession
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroBanner;