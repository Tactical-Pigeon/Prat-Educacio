import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { afegirAlCarret } = useCart();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imatge || 'https://via.placeholder.com/300?text=Producte'}
        alt={product.nom}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.nom}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.descripcio?.substring(0, 80)}...
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          {product.preu}€
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/product/${product.id}`}>
          Detalls
        </Button>
        <Button size="small" variant="contained" onClick={() => afegirAlCarret(product)}>
          Afegir al carret
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;