import React, { useState } from 'react';
import { Container, Grid, TextField, Typography, Button, Paper, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useForm, Controller } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const { cartItems, calcularTotal, buidarCarret } = useCart();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { nom: '', email: '', telefon: '', adreca: '' }
  });

  const subtotal = calcularTotal();
  const enviament = 5;
  const total = subtotal + enviament;

  const onSubmit = async (data) => {
    if (submitted || processing) return;

    if (!stripe || !elements) {
      setErrorMsg('Stripe no està llest. Torna-ho a provar.');
      return;
    }

    setProcessing(true);
    setErrorMsg(null);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setErrorMsg(error.message);
      setProcessing(false);
      return;
    }

    console.log('✅ Payment succeeded:', paymentMethod.id);
    setSubmitted(true);

    // Empty the cart
    buidarCarret();
    console.log('🛒 Cart emptied');

    // ✅ FORCE FULL PAGE NAVIGATION (bypasses React Router redirects)
    const confirmationUrl = `/confirmation?orderData=${encodeURIComponent(JSON.stringify(data))}&total=${total}`;
    window.location.href = confirmationUrl;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Dades personals</Typography>
            <Controller name="nom" control={control} rules={{ required: 'Nom obligatori' }} render={({ field }) => <TextField {...field} label="Nom complet" fullWidth margin="normal" error={!!errors.nom} helperText={errors.nom?.message} />} />
            <Controller name="email" control={control} rules={{ required: 'Email obligatori', pattern: { value: /^\S+@\S+$/i, message: 'Email invàlid' } }} render={({ field }) => <TextField {...field} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />} />
            <Controller name="telefon" control={control} rules={{ required: 'Telèfon obligatori' }} render={({ field }) => <TextField {...field} label="Telèfon" fullWidth margin="normal" error={!!errors.telefon} helperText={errors.telefon?.message} />} />
            <Controller name="adreca" control={control} rules={{ required: 'Adreça obligatòria' }} render={({ field }) => <TextField {...field} label="Adreça de lliurament" fullWidth margin="normal" error={!!errors.adreca} helperText={errors.adreca?.message} />} />

            <Typography variant="h6" sx={{ mt: 3 }}>Dades de pagament</Typography>
            <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2, my: 2 }}>
              <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </Box>
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Resum comanda</Typography>
            <Typography variant="body2">Articles: {cartItems.reduce((acc, i) => acc + i.quantitat, 0)}</Typography>
            <Typography variant="body2">Subtotal: {subtotal.toFixed(2)}€</Typography>
            <Typography variant="body2">Enviament: {enviament.toFixed(2)}€</Typography>
            <Typography variant="h6">Total: {total.toFixed(2)}€</Typography>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={!stripe || processing || submitted}>
              {processing ? 'Processant...' : 'Confirmar pagament'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
};

const Checkout = () => (
  <Container sx={{ py: 4 }}>
    <Typography variant="h4" gutterBottom>Finalitzar compra</Typography>
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </Container>
);

export default Checkout;