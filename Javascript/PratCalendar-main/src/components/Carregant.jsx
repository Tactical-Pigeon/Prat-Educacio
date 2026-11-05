import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
const Carregant = ({ missatge = 'Carregant...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: 2,
      }}
    >
      <CircularProgress size={48} />
      
 <Typography variant="body1" color="text.secondary">
        {missatge}
      </Typography>
    </Box>
  );
};

export default Carregant;