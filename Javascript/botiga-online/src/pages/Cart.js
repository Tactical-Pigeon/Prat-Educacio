import React from 'react';
import { Container, Typography, List, ListItem, IconButton, Button, Box, Divider } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, modificarQuantitat, eliminarDelCarret, calcularTotal } = useCart();

  const despesesEnviament = 5.0;
  const subtotal = calcularTotal();
  const total = subtotal + despesesEnviament;

  if (cartItems.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5">El teu carret està buit</Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>Segueix comprant</Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>El meu carret</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id} sx={{ flexDirection: 'column', alignItems: 'stretch', borderBottom: '1px solid #ddd', py: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body1"><strong>{item.nom}</strong></Typography>
                <Typography variant="body2">{item.preu}€ / unitat</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" onClick={() => modificarQuantitat(item.id, item.quantitat - 1)}><Remove /></IconButton>
                <Typography>{item.quantitat}</Typography>
                <IconButton size="small" onClick={() => modificarQuantitat(item.id, item.quantitat + 1)}><Add /></IconButton>
                <IconButton color="error" onClick={() => eliminarDelCarret(item.id)}><Delete /></IconButton>
              </Box>
              <Typography variant="body1">{(item.preu * item.quantitat).toFixed(2)}€</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, maxWidth: 400, ml: 'auto' }}>
        <Typography variant="h6">Resum de la comanda</Typography>
        <Typography variant="body2">Subtotal: {subtotal.toFixed(2)}€</Typography>
        <Typography variant="body2">Enviament: {despesesEnviament.toFixed(2)}€</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="h6">TOTAL: {total.toFixed(2)}€</Typography>
        <Button component={Link} to="/checkout" variant="contained" fullWidth sx={{ mt: 2 }} disabled={cartItems.length === 0}>
          Finalitzar compra
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;