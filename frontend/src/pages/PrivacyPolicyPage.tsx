import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Header from '../components/LandingNavbar/LandingNavbar';
import Footer from '../components/Footer/Footer';

interface PolicySection {
  title: string;
  content: string;
}

const policySections: PolicySection[] = [
  {
    title: '1. Who We Are',
    content: `CineNiche ("we", "our", "us") is an online platform that recommends movies based on user preferences. We are the data controller under GDPR.`
  },
  {
    title: '2. Personal Data We Collect',
    content: `
- Age
- Gender
- Email Address
- Password
- Cookies and Tracking Data`
  },
  {
    title: '3. Why We Process Your Data',
    content: `
- User authentication and account management – Performance of a contract (Art. 6(1)(b))
- Personalized recommendations – Legitimate interest (Art. 6(1)(f))
- Security and access controls – Legitimate interest (Art. 6(1)(f))
- Cookies for analytics – Consent (Art. 6(1)(a))
We do not share your data with third parties.`
  },
  {
    title: '4. Data Retention',
    content: 'We retain your data until you delete or update it. Anonymized data may be kept for improvements.'
  },
  {
    title: '5. Security Measures',
    content: `
- HTTPS + TLS, secure authentication, RBAC, API protection
- Data deletion confirmation, 2FA, input sanitization, CSP, HSTS`
  },
  {
    title: '6. Your Rights',
    content: `
Under GDPR:
- Access, Rectify, Erase, Restrict, Port, Object, Withdraw Consent
Contact us: support@cineniche.com`
  },
  {
    title: '7. Cookies and Tracking',
    content: `
We use cookies to:
- Authenticate users
- Remember preferences
- Analyze usage
Cookie banner allows control & updates at any time.`
  },
  {
    title: '8. Children’s Data',
    content: 'CineNiche is not intended for users under 16. No data is knowingly collected from children.'
  },
  {
    title: '9. International Data Transfers',
    content: 'We do not transfer your data outside the EEA. All processing is GDPR compliant.'
  },
  {
    title: '10. Contact',
    content: 'Email us at: support@cineniche.com'
  }
];

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{
        fontFamily: '"Josefin Sans", sans-serif',
        my: 6,
        '& .MuiTypography-root': {
          fontFamily: '"Josefin Sans", sans-serif'
        }
      }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          CineNiche Privacy Policy
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Effective Date: April 1, 2025
        </Typography>

        <Box mt={4}>
          {policySections.map((section, index) => (
            <Accordion key={index} disableGutters sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)'
            }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography whiteSpace="pre-line" variant="body1">
                  {section.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
