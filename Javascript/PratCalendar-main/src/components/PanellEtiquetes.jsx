import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Divider,
  IconButton,
  Collapse,
  Grid,
} from '@mui/material';
import {
  Label as IconaEtiqueta,
  ExpandMore as IconaExpandir,
  ExpandLess as IconaContreure,
  FilterList as IconaFiltre,
} from '@mui/icons-material';

const PanellEtiquetes = ({ etiquetes, etiquetaSeleccionada, alSeleccionarEtiqueta }) => {
  const [expandit, establirExpandit] = useState(true);

  const gestinarToggleExpandir = () => {
    establirExpandit(!expandit);
  };

  // Ordenar etiquetes per ús (més utilitzades primer)
  const etiquetesOrdenades = [...etiquetes].sort((a, b) => b.comptador - a.comptador);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
      }}
    >
      {/* Capçalera */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconaEtiqueta color="primary" sx={{ fontSize: 28 }} />
          <Typography variant="h5" fontWeight={600}>
            Filtra per Etiqueta
          </Typography>
          {etiquetes.length > 0 && (
            <Chip
              label={`${etiquetes.length} ${etiquetes.length === 1 ? 'etiqueta' : 'etiquetes'}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Stack>
        <IconButton size="small" onClick={gestinarToggleExpandir}>
          {expandit ? <IconaContreure /> : <IconaExpandir />}
        </IconButton>
      </Stack>

      <Collapse in={expandit}>
        {etiquetes.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <IconaFiltre sx={{ fontSize: 64, color: 'action.disabled', mb: 2 }} />
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Encara no tens cap etiqueta
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Afegeix etiquetes a les teves notes per poder filtrar-les aquí
            </Typography>
          </Box>
        ) : (
          <>
            {/* Botó per treure el filtre */}
            {etiquetaSeleccionada && (
              <>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <Chip
                    label="Mostrar totes les etiquetes"
                    onClick={() => alSeleccionarEtiqueta(null)}
                    color="default"
                    variant="outlined"
                    onDelete={() => alSeleccionarEtiqueta(null)}
                    sx={{
                      fontWeight: 600,
                      px: 2,
                      py: 2.5,
                    }}
                  />
                </Box>
                <Divider sx={{ mb: 3 }} />
              </>
            )}

            {/* Grid d'etiquetes */}
            <Grid container spacing={2}>
              {etiquetesOrdenades.map((etiqueta) => {
                const esSeleccionada = etiquetaSeleccionada === etiqueta.nom;

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={etiqueta.nom}>
                    <Paper
                      onClick={() => alSeleccionarEtiqueta(etiqueta.nom)}
                      elevation={esSeleccionada ? 4 : 1}
                      sx={{
                        p: 2.5,
                        cursor: 'pointer',
                        backgroundColor: esSeleccionada ? 'primary.main' : 'background.paper',
                        border: '2px solid',
                        borderColor: esSeleccionada ? 'primary.dark' : 'transparent',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: esSeleccionada ? 'primary.dark' : 'action.hover',
                          transform: 'translateY(-4px)',
                          elevation: 6,
                        },
                      }}
                    >
                      <Stack spacing={1.5}>
                        {/* Nom de l'etiqueta */}
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{
                            color: esSeleccionada ? 'white' : 'text.primary',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {etiqueta.nom}
                        </Typography>

                        {/* Comptador */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: esSeleccionada ? 'rgba(255,255,255,0.9)' : 'text.secondary',
                            }}
                          >
                            {etiqueta.comptador} {etiqueta.comptador === 1 ? 'nota' : 'notes'}
                          </Typography>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              backgroundColor: esSeleccionada ? 'white' : 'primary.main',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography
                              variant="body2"
                              fontWeight={700}
                              sx={{
                                color: esSeleccionada ? 'primary.main' : 'white',
                              }}
                            >
                              {etiqueta.comptador}
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>

            {/* Instruccions */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Fes clic en una etiqueta per veure tots els dies que la contenen
              </Typography>
            </Box>
          </>
        )}
      </Collapse>
    </Paper>
  );
};

export default PanellEtiquetes;
