import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import './TabsSection.css';

const TabsSection: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="tabsContainer">
      <div className="tabsOverlay" />
      <div className="tabsGlowBackground" />

      <Box sx={{ zIndex: 3, position: 'relative' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          TabIndicatorProps={{
            style: { backgroundColor: '#f5c518' },
          }}
          textColor="inherit"
        >
          <Tab
            disableRipple
            label="Pure Cinema"
            sx={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: value === 0 ? 'bold' : 'normal',
              color: value === 0 ? '#f5c518' : '#fff',
              transition: 'color 0.2s ease',
              '&:hover': { color: '#f5c518' },
            }}
          />
          <Tab
            disableRipple
            label="Collections"
            sx={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: value === 1 ? 'bold' : 'normal',
              color: value === 1 ? '#f5c518' : '#fff',
              transition: 'color 0.2s ease',
              '&:hover': { color: '#f5c518' },
            }}
          />
          <Tab
            disableRipple
            label="Community"
            sx={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: value === 2 ? 'bold' : 'normal',
              color: value === 2 ? '#f5c518' : '#fff',
              transition: 'color 0.2s ease',
              '&:hover': { color: '#f5c518' },
            }}
          />
        </Tabs>
      </Box>

      <Box className="tabsContent">
        {value === 0 && (
          <>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ fontFamily: "'Josefin Sans', sans-serif", color: 'white', mb: 2 }}
            >
              Pure Cinema, No interruptions
            </Typography>
            <Typography
              sx={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '1.3rem', color: 'white' }}
            >
              CineNiche believes cinema should be immersive — not interrupted. That’s why we’ll never show ads before,
              during, or after your films. No pop-ups, no pre-rolls, no distractions — just pure, uninterrupted
              storytelling the way it was meant to be experienced.
            </Typography>
          </>
        )}
        {value === 1 && (
          <>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ fontFamily: "'Josefin Sans', sans-serif", color: 'white', mb: 2 }}
            >
              Curated Like No One Else
            </Typography>
            <Typography
              sx={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '1.3rem', color: 'white' }}
            >
              CineNiche goes beyond algorithms with handpicked collections you won’t find anywhere else. From forgotten
              foreign gems to director deep-dives and rare festival darlings, every category is crafted to surprise,
              inspire, and celebrate cinema’s hidden corners. These aren’t your average playlists — they’re journeys.
            </Typography>
          </>
        )}
        {value === 2 && (
          <>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ fontFamily: "'Josefin Sans', sans-serif", color: 'white', mb: 2 }}
            >
              Join the CineNiche Community
            </Typography>
            <Typography
              sx={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '1.3rem', color: 'white' }}
            >
              Love dissecting plot twists? Quoting obscure indie lines?
              CineNiche is more than a streaming platform — it’s a haven for film fanatics. Jump into conversations,
              discover deep cuts through other fans, and share your hot takes with people who get it. From cult classics
              to award-season sleepers, we’re building the most passionate corner of the internet for true movie lovers.
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TabsSection;
