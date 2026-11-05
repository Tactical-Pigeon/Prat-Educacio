import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import temaPratCalendar from './tema/temaPratCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ca } from 'date-fns/locale';
import PaginaLogin from './pagines/PaginaLogin';
import PaginaCalendari from './pagines/PaginaCalendari';
import PaginaDia from './pagines/PaginaDia';
import Carregant from './components/Carregant';
import { useAuth } from './hooks/useAuth';

function App() {
  // Usar el hook personalizado de autenticación
  const { usuari, carregant, accedirAmbGoogle, tancarSessio } = useAuth();

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (carregant) {
    return <Carregant />;
  }

  return (
    <ThemeProvider theme={temaPratCalendar}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ca}>
        <Router>
          <Routes>
            {/* Ruta de login */}
            <Route
              path="/login"
              element={
                usuari ? (
                  <Navigate to="/calendari" replace />
                ) : (
                  <PaginaLogin alAccedirAmbGoogle={accedirAmbGoogle} />
                )
              }
            />

            {/* Ruta del calendari */}
            <Route
              path="/calendari"
              element={
                usuari ? (
                  <PaginaCalendari
                    usuari={usuari}
                    alTancarSessio={tancarSessio}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Ruta de la vista diària */}
            <Route
              path="/dia/:data"
              element={
                usuari ? (
                  <PaginaDia
                    usuari={usuari}
                    alTancarSessio={tancarSessio}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Redirecció per defecte */}
            <Route
              path="/"
              element={<Navigate to={usuari ? "/calendari" : "/login"} replace />}
            />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;