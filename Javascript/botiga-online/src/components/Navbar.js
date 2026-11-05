import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import { ShoppingCart, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { nombreArticles } = useCart();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          Botiga Online
        </Typography>
        <Button color="inherit" component={Link} to="/" startIcon={<Home />}>
          Inici
        </Button>
        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={nombreArticles} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;