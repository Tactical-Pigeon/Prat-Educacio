import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  isSameDay,
} from 'date-fns';
import { ca } from 'date-fns/locale';

const GridCalendari = ({ dataActual, diesAmbNotes, alSeleccionarDia }) => {
  // Obtenir els dies a mostrar (incloent dies del mes anterior/següent)
  const iniciMes = startOfMonth(dataActual);
  const fiMes = endOfMonth(dataActual);
  const iniciSetmana = startOfWeek(iniciMes, { weekStartsOn: 1 }); // Dilluns
  const fiSetmana = endOfWeek(fiMes, { weekStartsOn: 1 });
  const diesMostrar = eachDayOfInterval({
    start: iniciSetmana,
    end: fiSetmana,
  });

  // Noms dels dies de la setmana
  const diesSetmana = ['Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte', 'Diumenge'];

  // Comprovar si un dia té notes
  const teDiesNotes = (data) => {
    return diesAmbNotes.some(dia => isSameDay(dia, data));
  };

  // Agrupar els dies per setmanes
  const setmanes = [];
  for (let i = 0; i < diesMostrar.length; i += 7) {
    setmanes.push(diesMostrar.slice(i, i + 7));
  }

  return (
    <Box>
      {/* Capçalera amb els dies de la setmana */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'background.paper',
        }}
      >
        {/* Fila de capçaleres dels dies */}
        {diesSetmana.map((dia) => (
          <Box
            key={dia}
            sx={{
              p: 2,
              textAlign: 'center',
              backgroundColor: 'grey.100',
              borderBottom: '2px solid',
              borderColor: 'divider',
              fontWeight: 600,
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              {dia}
            </Typography>
          </Box>
        ))}

        {/* Files de dies del mes */}
        {setmanes.map((setmana, setmanaIndex) => (
          <React.Fragment key={setmanaIndex}>
            {setmana.map((dia) => {
              const esMesActual = isSameMonth(dia, dataActual);
              const esAvui = isToday(dia);
              const teNotes = teDiesNotes(dia);

              return (
                <Box
                  key={dia.toString()}
                  onClick={() => esMesActual && alSeleccionarDia(dia)}
                  sx={{
                    minHeight: '120px',
                    p: 1.5,
                    borderRight: '1px solid',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    cursor: esMesActual ? 'pointer' : 'default',
                    backgroundColor: esAvui
                      ? 'primary.light'
                      : esMesActual
                      ? 'background.paper'
                      : 'grey.50',
                    position: 'relative',
                    transition: 'all 0.2s',
                    '&:hover': esMesActual ? {
                      backgroundColor: esAvui ? 'primary.main' : 'action.hover',
                      transform: 'scale(1.02)',
                      zIndex: 1,
                      boxShadow: 2,
                    } : {},
                    // Treure el border dret de l'última columna
                    '&:nth-of-type(7n)': {
                      borderRight: 'none',
                    },
                  }}
                >
                  {/* Número del dia */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={esAvui ? 700 : 600}
                      sx={{
                        color: esAvui
                          ? 'primary.contrastText'
                          : esMesActual
                          ? 'text.primary'
                          : 'text.disabled',
                        backgroundColor: esAvui ? 'primary.dark' : 'transparent',
                        width: esAvui ? 32 : 'auto',
                        height: esAvui ? 32 : 'auto',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {format(dia, 'd')}
                    </Typography>

                    {/* Indicador de notes */}
                    {teNotes && esMesActual && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: esAvui ? 'white' : 'primary.main',
                        }}
                      />
                    )}
                  </Box>

                  {/* Espai per mostrar informació addicional (notes, esdeveniments) */}
                  {teNotes && esMesActual && (
                    <Box
                      sx={{
                        mt: 1,
                        p: 0.5,
                        backgroundColor: esAvui ? 'primary.dark' : 'primary.light',
                        borderRadius: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: esAvui ? 'white' : 'primary.dark',
                          fontSize: '0.7rem',
                        }}
                      >
                        Té notes
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default GridCalendari;
