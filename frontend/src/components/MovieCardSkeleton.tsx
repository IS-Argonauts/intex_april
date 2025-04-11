import React from 'react';
import { Card, Box, Skeleton } from '@mui/material';

const MovieCardSkeleton: React.FC = () => {
  return (
    <Card
      sx={{
        width: 2300,
        height: 400,
        backgroundColor: '#1A1A1A',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height="90%"
        animation="wave"
        sx={{ bgcolor: '#2a2a2a' }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '10%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4px',
        }}
      >
        <Skeleton
          variant="text"
          width="80%"
          height={14}
          sx={{ bgcolor: '#333' }}
        />
      </Box>
    </Card>
  );
};

export default MovieCardSkeleton;
