import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/LandingNavbar/LandingNavbar';
import Footer from '../components/Footer/Footer';
import '../components/Login.css';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | string[]>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      try {
        const res = await fetch('https://localhost:44307/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
          navigate('/login');
        } else {
          let message: string | string[] = 'Error registering.';
          try {
            const data = await res.json();
            if (Array.isArray(data)) {
              // Array of error descriptions
              message = data.map(
                (e: any) => e.description || JSON.stringify(e)
              );
            } else if (typeof data === 'object' && data.message) {
              message = data.message;
            } else {
              message = JSON.stringify(data);
            }
          } catch (err) {
            console.error('⚠️ Non-JSON error from backend');
          }
          setError(message);
        }
      } catch (err) {
        setError('Error registering.');
        console.error(err);
      }
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
              '&:hover': {
                boxShadow: '0 0 20px 5px rgba(252, 208, 118, 0.9)',
              },
            }}
          >
            <Typography variant="h4" mb={3} fontWeight={600} color="white">
              Register
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

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: '#FCD076',
                color: '#2b2b2b',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#e6b85f',
                  boxShadow: '0 0 8px rgba(252, 208, 118, 0.8)',
                },
              }}
            >
              Register
            </Button>

            {/* ✅ Error Message Renderer */}
            <Box mt={2}>
              {Array.isArray(error) ? (
                error.map((msg, index) => (
                  <Typography key={index} variant="body2" color="error">
                    {msg}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
            </Box>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 4, color: 'white' }}
            >
              Already have an account?{' '}
              <Box
                component="span"
                sx={{
                  color: '#FCD076',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
                onClick={() => navigate('/login')}
              >
                Sign in here
              </Box>
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default RegisterPage;
