import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useCookieConsent } from '../hooks/useCookieConsent';

const CookieConsentBanner: React.FC = () => {
  const { consent, grantConsent, denyConsent } = useCookieConsent();

  if (consent !== 'unset') return null;

  return (
    <Paper
      elevation={6}
      sx={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '95%',
        maxWidth: 600,
        zIndex: 1500,
        bgcolor: '#ffffff',
        borderRadius: 3,
        p: 3,
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        fontFamily: '"Josefin Sans", sans-serif', // Ensures Paper has it
      }}
    >
      <Box sx={{ fontFamily: '"Josefin Sans", sans-serif' }}>
        <Typography
          variant="body1"
          fontWeight={500}
          sx={{ mb: 1, fontFamily: '"Josefin Sans", sans-serif' }}
        >
          🍪 We use cookies to enhance your experience, analyze usage, and remember your preferences.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 2,
            fontFamily: '"Josefin Sans", sans-serif',
          }}
        >
          You can accept or reject non-essential cookies now, and update your preferences at any time.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            fontFamily: '"Josefin Sans", sans-serif',
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={denyConsent}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontFamily: '"Josefin Sans", sans-serif',
            }}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={grantConsent}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontFamily: '"Josefin Sans", sans-serif',
            }}
          >
            Accept
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CookieConsentBanner;
