import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import theme from './theme';
import { CartProvider } from './context/CartContext';
console.log('Firebase Project ID:', process.env.REACT_APP_FIREBASE_PROJECT_ID);
console.log('Stripe Key:', process.env.REACT_APP_STRIPE_PUBLIC_KEY);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);