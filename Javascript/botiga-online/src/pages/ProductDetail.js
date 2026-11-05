import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, IconButton, TextField } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { obtenirProductePerId } from '../services/productsService';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantitat, setQuantitat] = useState(1);
  const { afegirAlCarret } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const carregarProducte = async () => {
      if (!id) {
        setError('ID de producte no vàlid');
        setLoading(false);
        return;
      }
      try {
        const data = await obtenirProductePerId(id);
        if (!data) {
          setError('Producte no trobat');
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.error('Error carregant producte:', err);
        setError('No s’ha pogut carregar el producte');
      } finally {
        setLoading(false);
      }
    };
    carregarProducte();
  }, [id]);

  const handleAfegir = () => {
    if (product) {
      afegirAlCarret(product, quantitat);
      navigate('/cart');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">{error}</Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Tornar a la botiga
        </Button>
      </Container>
    );
  }
  if (!product) return null;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={product.imatge || 'https://via.placeholder.com/500'}
            alt={product.nom}
            style={{ width: '100%', borderRadius: 8 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>{product.nom}</Typography>
          <Typography variant="body1" paragraph>{product.descripcio}</Typography>
          <Typography variant="h5" color="primary" gutterBottom>{product.preu}€</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
            <IconButton onClick={() => setQuantitat(Math.max(1, quantitat - 1))}><Remove /></IconButton>
            <TextField
              value={quantitat}
              inputProps={{ readOnly: true, style: { textAlign: 'center', width: 50 } }}
            />
            <IconButton onClick={() => setQuantitat(quantitat + 1)}><Add /></IconButton>
          </Box>
          <Button variant="contained" size="large" onClick={handleAfegir}>
            Afegir al carret
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;