import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

interface MovieFiltersProps {
  genres: string[];
  genre: string;
  setGenre: (genre: string) => void;
}

const MovieFilters: React.FC<MovieFiltersProps> = ({
  genres,
  genre,
  setGenre,
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ px: 3, mb: 5 }}>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center', // center the row
        }}
      >
        {/* Genre Buttons */}
        {genres.map((g) => (
          <Box
            key={g}
            onClick={() => setGenre(g)}
            sx={{
              px: 4,
              py: 2,
              borderRadius: '16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontFamily: '"Josefin Sans", sans-serif',
              backgroundColor: genre === g ? '#ffffff' : '#2c2c2c',
              color: genre === g ? '#111' : '#fff',
              border: genre === g ? '2px solid white' : '2px solid transparent',
              transition: '0.2s',
              boxShadow: genre === g ? '0 0 10px rgba(255,255,255,0.4)' : 'none',
              fontSize: '18px',
              minWidth: '140px',
              textAlign: 'center',
              '&:hover': {
                backgroundColor: genre === g ? '#ffffff' : '#444',
              },
            }}
          >
            {g}
          </Box>
        ))}

        {/* Search Button */}
        <Tooltip
            title={
                <span style={{ fontFamily: '"Josefin Sans", sans-serif' }}>
                Search by Title or Director
                </span>
            }
            >
          <IconButton
            onClick={() => navigate('/catalog')}
            sx={{
              backgroundColor: '#2c2c2c',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: '#111',
              },
              borderRadius: '16px',
              p: 1.5,
              ml: 2,
              height: '48px',
              width: '48px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SearchIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default MovieFilters;