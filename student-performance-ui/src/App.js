// App.js
import React from 'react';
import { Box, Container, Typography } from '@mui/material'; // Import Material-UI components
import AdminPanel from './components/AdminPanel';

const App = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(135deg, #f06, #0043ff)', // Gradient background
        color: 'white', // Text color
        padding: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            marginBottom: 4,
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif', // Custom font
            fontWeight: 'bold', // Bold font for the header
            letterSpacing: '2px', // Letter spacing for a more modern feel
            textTransform: 'uppercase', // Text to uppercase for style
          }}
        >
          Welcome to the Admin Panel
        </Typography>
        <AdminPanel /> {/* Include AdminPanel here */}
      </Container>
    </Box>
  );
};

export default App;
