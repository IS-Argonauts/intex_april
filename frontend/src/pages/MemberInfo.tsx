import { useState } from 'react';
import { Box, Button, Typography, TextField, List, ListItem, ListItemButton } from '@mui/material';
import MainNavbar from '../components/MainNavbar/MainNavbar';
import Footer from '../components/Footer/Footer';

const tabs = [
  { id: 'profileInfo', label: 'Account Details' },
  { id: 'payment', label: 'Change Payment Info' },
  { id: 'billing', label: 'Billing History' }
];

const dummyBillingHistory = [
  { date: '2025-01-12', item: 'Subscription - Monthly', amount: '$9.99' },
  { date: '2025-02-12', item: 'Subscription - Monthly', amount: '$9.99' },
  { date: '2025-03-12', item: 'Subscription - Monthly', amount: '$9.99' },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profileInfo');
  const [isEditing, setIsEditing] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'profileInfo':
        return (
          <Box>
            <Typography variant="h5" color="white" mb={2}>Account Information</Typography>
            <TextField label="First Name" fullWidth margin="normal" disabled={!isEditing} InputLabelProps={{ style: { color: 'white' } }} InputProps={{ style: { color: 'white' } }} />
            <TextField label="Last Name" fullWidth margin="normal" disabled={!isEditing} InputLabelProps={{ style: { color: 'white' } }} InputProps={{ style: { color: 'white' } }} />
            <TextField label="Email" fullWidth margin="normal" disabled={!isEditing} InputLabelProps={{ style: { color: 'white' } }} InputProps={{ style: { color: 'white' } }} />
            <Button onClick={() => setIsEditing(!isEditing)} sx={{ mt: 2, backgroundColor: '#FCD076', color: '#2b2b2b', fontWeight: 600 }}> {isEditing ? 'Save' : 'Edit'} </Button>
          </Box>
        );
      case 'payment':
        return (
          <Box>
            <Typography variant="h5" color="white" mb={2}>Change Payment Info</Typography>
            <TextField label="Card Number" fullWidth margin="normal" InputLabelProps={{ style: { color: 'white' } }} InputProps={{ style: { color: 'white' } }} />
            <TextField label="Expiration Date" fullWidth margin="normal" InputLabelProps={{ style: { color: 'white' } }} InputProps={{ style: { color: 'white' } }} />
            <TextField label="CVV" fullWidth margin="normal" InputLabelProps={{ style: { color: 'white' } }} InputProps={{ style: { color: 'white' } }} />
            <TextField label="Billing Zip Code" fullWidth margin="normal" InputLabelProps={{ style: { color: 'white' } }} InputProps={{ style: { color: 'white' } }} />
            <Button sx={{ mt: 2, backgroundColor: '#FCD076', color: '#2b2b2b', fontWeight: 600 }}>Update Payment</Button>
          </Box>
        );
      case 'billing':
        return (
          <Box>
            <Typography variant="h5" color="white" mb={2}>Billing History</Typography>
            {dummyBillingHistory.map((entry, index) => (
              <Typography key={index} color="white" mb={1}>{entry.date} - {entry.item} - {entry.amount}</Typography>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <MainNavbar />
      {/* <Box sx={{ width: '100%', backgroundColor: '#2b2b2b', padding: '1rem'}}>
        <Typography variant="h4" color="white" fontWeight={600}>
            Profile
        </Typography>
        </Box> */}
      {/* Whole Profile Page Wrapper */}
      <Box
        sx={{
            minHeight: '90vh',
            backgroundColor: '#1f1f1f',
            display: 'flex',
            pt: 6,
        }}
        >
        {/* Sidebar */}
        <Box
            sx={{
            width: '220px',
            backgroundColor: '#2b2b2b',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            }}
        >
            <List sx={{ flexGrow: 1 }}>
            {tabs.map(tab => (
                <ListItem key={tab.id} disablePadding>
                <ListItemButton sx={{ color: 'white' }} onClick={() => setActiveTab(tab.id)}>
                    {tab.label}
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Box>

        {/* GLOW LINE */}
        <Box
            sx={{
            width: '2px',
            background: 'linear-gradient(to bottom, #FCD076, transparent, #FCD076)',
            boxShadow: '0 0 8px 2px rgba(252, 208, 118, 0.5)',
            }}
        />

        {/* Content area */}
        <Box
            sx={{
            flexGrow: 1,
            backgroundColor: '#4a4a4a',
            p: 4,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            }}
        >
            <Box sx={{ width: '100%', maxWidth: '700px' }}>
            {renderContent()}
            </Box>
        </Box>
        </Box>
      <Footer />
    </>
  );  
};

export default ProfilePage;
