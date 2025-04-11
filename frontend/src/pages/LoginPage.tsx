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
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import '../components/Login.css';

import Header from '../components/BasicHeader';
import Footer from '../components/Footer/Footer';

const BASE_URL = import.meta.env.VITE_API_URL;

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

    const BASE_URL = import.meta.env.VITE_API_URL;

    const loginUrl = `${BASE_URL}/login?useSessionCookies=true`;

    try {
      const loginRes = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          rememberMe: rememberme,
        }),
      });

      if (!loginRes.ok) {
        const errorData = await loginRes.json();
        throw new Error(errorData?.message || 'Invalid email or password.');
      }

      const authCheck = await fetch(`${BASE_URL}/pingauth`, {
        credentials: 'include',
      });

      if (!authCheck.ok) {
        throw new Error('Authenticated, but session not confirmed.');
      }

      navigate('/home');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Login error:', error);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/google-login1`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (!res.ok) throw new Error('Google login failed');

      const authCheck = await fetch(`${BASE_URL}/pingauth`, {
        credentials: 'include',
      });

      if (!authCheck.ok)
        throw new Error('Session not confirmed after Google login');

      navigate('/home');
    } catch (error: any) {
      console.error('Google login error:', error);
      setError(error.message || 'Google login failed');
    }
  };

  return (
    <>
      <Header />
      <Box className="auth-container">
        <Container maxWidth="sm">
          <Box component="form" className="auth-box" onSubmit={handleSubmit}>
            <Typography variant="h4" mb={3} fontWeight={600}>
              Sign In
            </Typography>

            <TextField
              className="auth-field"
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              className="auth-field"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

            <Button type="submit" fullWidth className="auth-button">
              Sign In
            </Button>

            <Box mt={3} textAlign="center">
              <Typography variant="body1" mb={1}>
                or
              </Typography>
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setError('Google login failed')}
                useOneTap
              />
            </Box>

            {error && (
              <Typography variant="body2" color="error" mt={2}>
                {error}
              </Typography>
            )}

            <Typography variant="body2" align="center" sx={{ mt: 4 }}>
              Don’t have an account?{' '}
              <Box
                component="span"
                className="auth-link"
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
