import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../components/Login.css'

import Header from '../components/LandingNavbar/LandingNavbar';
import Footer from '../components/Footer/Footer';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl = rememberme
      ? 'https://localhost:44307/login?useCookies=true'
      : 'https://localhost:44307/login?useSessionCookies=true';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      navigate('/home');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: '120vh',
          backgroundColor: '#1f1f1f',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 6,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: '#2b2b2b',
              padding: 4,
              borderRadius: 2,
              textAlign: 'center',
              boxShadow: '0 0 12px 2px rgba(252, 208, 118, 0.6)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 0 20px 5px rgba(252, 208, 118, 0.9)',
              },
            }}
          >
            <Typography variant="h4" mb={3} fontWeight={600} color="white">
              Sign In
            </Typography>

            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberme}
                  onChange={(e) => setRememberme(e.target.checked)}
                  sx={{
                    color: '#FCD076',
                    '&.Mui-checked': { color: '#FCD076' },
                  }}
                />
              }
              label="Remember me"
              sx={{ color: 'white', textAlign: 'left', mt: 1 }}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: '#FCD076',
                color: '#2b2b2b',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#e6b85f',
                  boxShadow: '0 0 8px rgba(252, 208, 118, 0.8)',
                },
              }}
            >
              Sign In
            </Button>

            <Typography variant="body2" color="error" mt={2}>
              {error}
            </Typography>

            <Typography variant="body2" align="center" sx={{ mt: 4 }}>
              Don’t have an account?{' '}
              <Box
                component="span"
                sx={{
                  color: '#FCD076',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
                onClick={() => navigate('/register')}
              >
                Sign up here
              </Box>
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default LoginPage;
