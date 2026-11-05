import { createTheme } from '@mui/material/styles';

// Definició de la paleta de colors
const temaPratCalendar = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',      // Blau principal
      light: '#42a5f5',     // Blau clar
      dark: '#1565c0',      // Blau fosc
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',     
  // Rosa/Vermell
      light: '#e33371',
      dark: '#9a0036',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',      // Verd per confirmacions
      light: '#4caf50',
      dark: '#1b5e20',
    },
    warning: {
      main: '#ed6c02',      // Taronja per avisos
      light: '#ff9800',
      
 dark: '#e65100',
    },
    error: {
      main: '#d32f2f',      // Vermell per errors
      light: '#ef5350',
      dark: '#c62828',
    },
    info: {
      main: '#0288d1',      // Blau informatiu
      light: '#03a9f4',
      dark: '#01579b',
    },
    background: {
      default: '#f5f5f5',   // Fons general
 
      paper: '#ffffff',      // Fons de targetes
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
 
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
 
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      
 fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',  // Evita majúscules automàtiques
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,  // Racons arrodonits per defecte
  },
  spacing: 8,  // Unitat d'espaiat (8px)
  components: {
    MuiButton: {
   
    styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 
 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: 12,
        },
      },
    
 },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
    
     variant: 'outlined',
      },
    },
  },
});
export default temaPratCalendar;