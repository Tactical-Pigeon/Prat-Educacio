import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import {
  CalendarMonth as IconaCalendari,
  Google as IconaGoogle,
} from '@mui/icons-material';

const PaginaLogin = ({ alAccedirAmbGoogle }) => {
  const [carregant, establirCarregant] = useState(false);
  const [error, establirError] = useState(null);

  const gestinarClickLogin = async () => {
    try {
      establirCarregant(true);
      establirError(null);
      await alAccedirAmbGoogle();
    } catch (error) {
      console.error('Error en el login:', error);
      establirError('No s\'ha pogut iniciar sessió. Si us plau, torna-ho a intentar.');
    } finally {
      establirCarregant(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          {/* Logo i títol */}
          <Stack spacing={2} alignItems="center" mb={4}>
            <IconaCalendari
              sx={{
                fontSize: 80,
                color: 'primary.main',
              }}
            />
            <Typography variant="h3" component="h1" fontWeight={700}>
              PratCalendar
            </Typography>
            <Typography variant="h6" color="text.secondary">
              El teu calendari acadèmic personalitzat
            </Typography>
          </Stack>

          {/* Descripció */}
          <Typography variant="body1" color="text.secondary" mb={4}>
            Organitza les teves tasques, apunts i esdeveniments diaris.
            Inicia sessió amb el teu compte de Google per començar.
          </Typography>

          {/* Mostrar error si existe */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Botó de Google Login */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<IconaGoogle />}
              onClick={gestinarClickLogin}
              disabled={carregant}
              sx={{
                backgroundColor: 'white',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                '&:disabled': {
                  backgroundColor: '#e0e0e0',
                },
                textTransform: 'none',
                fontSize: '16px',
                px: 3,
                py: 1.5,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {carregant ? 'Iniciant sessió...' : 'Inicia sessió amb Google'}
            </Button>
          </Box>

          {/* Informació addicional */}
          <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
            En iniciar sessió, acceptes els nostres termes i condicions
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PaginaLogin;
