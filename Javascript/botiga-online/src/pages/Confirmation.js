import React from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  
  // Try to get data from state (if coming from normal navigate) or from URL query string
  let orderData = null;
  let total = null;
  
  if (location.state) {
    orderData = location.state.orderData;
    total = location.state.total;
  } else {
    // Check URL query parameters
    const params = new URLSearchParams(location.search);
    const orderDataStr = params.get('orderData');
    if (orderDataStr) {
      try {
        orderData = JSON.parse(decodeURIComponent(orderDataStr));
        total = parseFloat(params.get('total'));
      } catch (e) {
        console.error('Failed to parse order data', e);
      }
    }
  }

  const orderNumber = Math.floor(Math.random() * 1000000);

  if (!orderData) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5">No s'ha trobat cap comanda</Typography>
        <Typography variant="body2" color="textSecondary">
          Sembla que has accedit a aquesta pàgina directament. Si has realitzat una compra, hauries de rebre un correu de confirmació aviat.
        </Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
          Tornar a la botiga
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          ✅ Comanda realitzada!
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Número de comanda: #{orderNumber}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Gràcies per la teva compra, {orderData.nom}.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Rebràs un correu de confirmació a {orderData.email}.
        </Typography>
        <Typography variant="h5" sx={{ mt: 3 }}>
          Total pagat: {total?.toFixed(2)}€
        </Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 4 }}>
          Seguir comprant
        </Button>
      </Paper>
    </Container>
  );
};

export default Confirmation;