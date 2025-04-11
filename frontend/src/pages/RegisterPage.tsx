import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/LandingNavbar/LandingNavbar';
import Footer from '../components/Footer/Footer';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | string[]>('');
  const navigate = useNavigate();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<{ name?: string; value: unknown }>
      | any
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
    }
  };

  const validateForm = () => {
    if (!email || !name || !age || !gender || !password || !confirmPassword) {
      return 'Please fill in all fields.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address.';
    }
    if (/\d/.test(name)) {
      return 'Name cannot contain numbers.';
    }
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 16) {
      return 'You must be at least 16 years old.';
    }
    if (password.length < 13) {
      return 'Password must be at least 13 characters long.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          age: parseInt(age),
          gender,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (Array.isArray(data.errors)) {
          setError(
            data.errors.map((e: any) => e.description || JSON.stringify(e))
          );
        } else {
          throw new Error(data.message || 'Error registering.');
        }
        return;
      }

      setError('');
      navigate('/login');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error registering.');
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
              label="Name"
              name="name"
              value={name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              value={age}
              onChange={handleChange}
              fullWidth
              margin="normal"
              inputProps={{ min: 16 }}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="gender-label" sx={{ color: 'white' }}>
                Gender
              </InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={gender}
                onChange={handleChange}
                sx={{ color: 'white' }}
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="preferNotToSay">Prefer not to say</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
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

            <Box mt={2}>
              {Array.isArray(error)
                ? error.map((msg, index) => (
                    <Typography key={index} variant="body2" color="error">
                      {msg}
                    </Typography>
                  ))
                : error && (
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
