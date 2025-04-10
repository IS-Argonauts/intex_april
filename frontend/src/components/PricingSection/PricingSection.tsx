import React from 'react';
import { Card, CardContent, Typography, Box, Container } from '@mui/material';
import './PricingSection.css';

const pricingOptions = [
  {
    title: 'CineGoer',
    price: '$7/mo',
    description: [
      'Curated Weekly Picks',
      'Customizable Watch List',
      'Community Reviews',
    ],
  },
  {
    title: 'CinePhile',
    price: '$12/mo',
    description: [
      'Access to full collection',
      '2 Downloads/month',
      'Early access to new collections',
    ],
  },
  {
    title: 'CineManiac',
    price: '$30/mo',
    description: [
      'Stream 4 things at once',
      'Account Sharing',
      'Download any content',
    ],
  },
];

const PricingSection: React.FC = () => {
  return (
    <Box className="pricing-section">
      <Container maxWidth="lg">
        <Typography className="pricing-title">Our Plans</Typography>

        <div className="pricing-cards-wrapper">
          {pricingOptions.map((option, index) => (
            <div key={option.title} className="pricing-card-wrapper">
              <Card
                className={`pricing-card ${index === 1 ? 'highlight-card' : ''}`}
                elevation={index === 1 ? 12 : 8}
              >
                {index === 1 && (
                  <div className="ribbon">
                    <span>Most Popular</span>
                  </div>
                )}
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontFamily: "'Josefin Sans', sans-serif",
                      color: 'white',
                      fontWeight: 700,
                    }}
                  >
                    {option.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: '#aaa',
                      fontFamily: "'Josefin Sans', sans-serif",
                    }}
                  >
                    {option.price}
                  </Typography>
                  <ul className="feature-list">
                    {option.description.map((line) => (
                      <li key={line} className="feature-item">
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "'Josefin Sans', sans-serif", color: 'white' }}
                        >
                          • {line}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </Box>
  );
};

export default PricingSection;

