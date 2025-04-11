import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MainHeader from '../components/MainNavbar/MainNavbar';
import Footer from '../components/Footer/Footer';
import '../components/ProfilePage.css';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const dataFromApi = {
        firstName: 'Hadley',
        lastName: 'Smith',
        email: 'hadley@example.com',
      };
      setUserInfo(dataFromApi);
    };

    fetchUserInfo();
  }, []);

  const handleDelete = () => {
    setOpenDelete(false);
    navigate('/');
  };

  const handleInputChange = (field: keyof typeof userInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Box className="profile-container">
        <MainHeader />

        <Box className="profile-content-center-only">
          <Box className="profile-box">
            <Typography variant="h4" className="profile-header">
              Your Profile
            </Typography>

            <Typography variant="h6" color="white" mb={2}>
              Account Information
            </Typography>

            {/* First Name */}
            {isEditing ? (
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                value={userInfo.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            ) : (
              <Box className="profile-readonly-field">
                <Typography className="profile-readonly-label">
                  First Name
                </Typography>
                <Typography className="profile-readonly-value">
                  {userInfo.firstName}
                </Typography>
              </Box>
            )}

            {/* Last Name */}
            {isEditing ? (
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                value={userInfo.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            ) : (
              <Box className="profile-readonly-field">
                <Typography className="profile-readonly-label">
                  Last Name
                </Typography>
                <Typography className="profile-readonly-value">
                  {userInfo.lastName}
                </Typography>
              </Box>
            )}

            {/* Email */}
            {isEditing ? (
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={userInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            ) : (
              <Box className="profile-readonly-field">
                <Typography className="profile-readonly-label">
                  Email
                </Typography>
                <Typography className="profile-readonly-value">
                  {userInfo.email}
                </Typography>
              </Box>
            )}

            <Box className="profile-buttons">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="profile-gold-button"
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
              <Button
                onClick={() => setOpenDelete(true)}
                className="profile-delete-button"
              >
                Delete Account
              </Button>
            </Box>
          </Box>
        </Box>

        <Footer />
      </Box>

      {/* Confirm Deletion Modal */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Yes, Delete My Account
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfilePage;
