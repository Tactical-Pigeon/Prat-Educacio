import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { obtenirProductes } from '../services/productsService';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarProductes = async () => {
      try {
        const data = await obtenirProductes();
        setProducts(data);
      } catch (err) {
        setError('No s’han pogut carregar els productes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
      const data = await obtenirProductes();
      console.log('Productes rebuts:', data);
    };
    carregarProductes();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Catàleg de productes
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;