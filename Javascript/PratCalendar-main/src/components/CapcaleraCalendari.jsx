import React from 'react';
import { Typography, IconButton, Stack } from '@mui/material';
import {
  ChevronLeft as IconaEsquerra,
  ChevronRight as IconaDreta,
  Today as IconaAvui,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ca } from 'date-fns/locale';
const CapcaleraCalendari = ({ dataActual, alCanviarMes, alAnarAvui }) => {
  const mesActualFormatat = format(dataActual, 'MMMM yyyy', { locale: ca });
const anarMesAnterior = () => {
    const novaMes = new Date(dataActual);
    novaMes.setMonth(novaMes.getMonth() - 1);
    alCanviarMes(novaMes);
  };
const anarMesSeguent = () => {
    const novaMes = new Date(dataActual);
    novaMes.setMonth(novaMes.getMonth() + 1);
    alCanviarMes(novaMes);
  };
return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ mb: 3 }}
    >
      {/* Mes i any actual */}
      <Typography variant="h4" component="h2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
        {mesActualFormatat}
      </Typography>

      {/* Controls de navegació */}
      <Stack direction="row" spacing={1}>
       
  <IconButton
          onClick={anarMesAnterior}
          aria-label="mes anterior"
          size="large"
        >
          <IconaEsquerra />
        </IconButton>
        
        <IconButton
          onClick={alAnarAvui}
          aria-label="anar a avui"
   
        size="large"
          color="primary"
        >
          <IconaAvui />
        </IconButton>
        
        <IconButton
          onClick={anarMesSeguent}
          aria-label="mes següent"
          size="large"
        >
 
          <IconaDreta />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default CapcaleraCalendari;