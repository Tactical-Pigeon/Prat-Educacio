import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Stack,
  Box,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import {
  Close as IconaTancar,
  CalendarToday as IconaCalendari,
  StickyNote2 as IconaNota,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ca } from 'date-fns/locale';

const LlistaDiesFiltrats = ({ obert, alTancar, etiqueta, diesAmbEtiqueta, alSeleccionarDia }) => {
  if (!etiqueta) return null;

  // Ordenar dies per data (més recents primer)
  const diesOrdenats = [...diesAmbEtiqueta].sort((a, b) => b.data - a.data);

  return (
    <Dialog
      open={obert}
      onClose={alTancar}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" fontWeight={600}>
              Dies amb l'etiqueta
            </Typography>
            <Chip label={etiqueta} color="primary" />
          </Stack>
          <IconButton onClick={alTancar} size="small">
            <IconaTancar />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        {diesOrdenats.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '200px',
              textAlign: 'center',
            }}
          >
            <IconaNota sx={{ fontSize: 80, color: 'action.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hi ha dies amb aquesta etiqueta
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              S'han trobat {diesOrdenats.length} {diesOrdenats.length === 1 ? 'dia' : 'dies'} amb aquesta etiqueta
            </Typography>

            {diesOrdenats.map((dia) => (
              <Paper
                key={dia.data.toString()}
                elevation={2}
                sx={{
                  p: 2.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    elevation: 4,
                    transform: 'translateY(-2px)',
                    backgroundColor: 'action.hover',
                  },
                }}
                onClick={() => {
                  alSeleccionarDia(dia.data);
                  alTancar();
                }}
              >
                <Stack spacing={2}>
                  {/* Data */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconaCalendari color="primary" fontSize="small" />
                    <Typography variant="h6" fontWeight={600}>
                      {format(dia.data, "d 'de' MMMM 'de' yyyy", { locale: ca })}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      ({format(dia.data, 'EEEE', { locale: ca })})
                    </Typography>
                  </Stack>

                  <Divider />

                  {/* Notes del dia */}
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {dia.notes.length} {dia.notes.length === 1 ? 'nota' : 'notes'}:
                    </Typography>
                    <Stack spacing={1} sx={{ mt: 1 }}>
                      {dia.notes.map((nota, index) => (
                        <Box
                          key={index}
                          sx={{
                            pl: 2,
                            borderLeft: '3px solid',
                            borderColor: 'primary.main',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {nota.contingut_text}
                          </Typography>
                          {/* Altres etiquetes de la nota */}
                          {nota.etiquetes && nota.etiquetes.length > 1 && (
                            <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }} flexWrap="wrap" useFlexGap>
                              {nota.etiquetes
                                .filter((e) => e !== etiqueta)
                                .map((e) => (
                                  <Chip key={e} label={e} size="small" variant="outlined" />
                                ))}
                            </Stack>
                          )}
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LlistaDiesFiltrats;
