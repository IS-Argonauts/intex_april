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
import '../components/Login.css';

import Header from '../components/BasicHeader';
import Footer from '../components/Footer/Footer';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

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
      const response = await fetch('https://localhost:44307/register', {
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
        throw new Error(data.message || 'Error registering.');
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
      <Box className="auth-container">
        <Container maxWidth="sm">
          <Box component="form" onSubmit={handleSubmit} className="auth-box">
            <Typography variant="h4" mb={3} fontWeight={600}>
              Register
            </Typography>

            <TextField
              className="auth-field"
              label="Name"
              name="name"
              value={name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              className="auth-field"
              label="Age"
              name="age"
              value={age}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
              inputProps={{ min: 16 }}
            />

            <FormControl fullWidth margin="normal" className="auth-field">
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
              className="auth-field"
              label="Email"
              name="email"
              value={email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="email"
            />

            <TextField
              className="auth-field"
              label="Password"
              name="password"
              value={password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="password"
            />

            <TextField
              className="auth-field"
              label="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="password"
            />

            {error && (
              <Typography variant="body2" color="error" mt={2}>
                {error}
              </Typography>
            )}

            <Button type="submit" fullWidth className="auth-button">
              Register
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 4 }}>
              Already have an account?{' '}
              <Box
                component="span"
                className="auth-link"
                onClick={() => navigate('/login')}
              >
                Log In
              </Box>
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Register;
