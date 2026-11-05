import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Divider,
} from '@mui/material';
import {
  Edit as IconaEditar,
  Delete as IconaEsborrar,
  AttachFile as IconaFitxer,
  StickyNote2 as IconaNota,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { ca } from 'date-fns/locale';

const LlistaNotes = ({ notes, alEditar, alEsborrar }) => {
  if (notes.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          textAlign: 'center',
        }}
      >
        <IconaNota sx={{ fontSize: 80, color: 'action.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No hi ha notes per aquest dia
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fes clic al botó + per afegir la teva primera nota
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
        Notes del dia ({notes.length})
      </Typography>

      <Stack spacing={2}>
        {notes.map((nota) => (
          <Card
            key={nota.id}
            elevation={2}
            sx={{
              transition: 'all 0.2s',
              '&:hover': {
                elevation: 4,
                transform: 'translateY(-2px)',
              },
            }}
          >
            <CardContent>
              {/* Contingut de la nota */}
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
              >
                {nota.contingut_text}
              </Typography>

              {/* Fitxer adjunt */}
              {nota.ruta_fitxer && (
                <Paper
                  sx={{
                    p: 1.5,
                    mb: 2,
                    backgroundColor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <IconaFitxer fontSize="small" color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {nota.ruta_fitxer}
                  </Typography>
                </Paper>
              )}

              {/* Etiquetes */}
              {nota.etiquetes && nota.etiquetes.length > 0 && (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {nota.etiquetes.map((etiqueta) => (
                    <Chip
                      key={etiqueta}
                      label={etiqueta}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              )}

              {/* Data de creació */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mt: 2 }}
              >
                Creada: {format(new Date(nota.data_creacio), "d 'de' MMMM 'a les' HH:mm", { locale: ca })}
              </Typography>
            </CardContent>

            <Divider />

            <CardActions sx={{ justifyContent: 'flex-end', px: 2, py: 1 }}>
              <IconButton
                size="small"
                color="primary"
                onClick={() => alEditar(nota)}
                aria-label="editar nota"
              >
                <IconaEditar fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => alEsborrar(nota.id)}
                aria-label="esborrar nota"
              >
                <IconaEsborrar fontSize="small" />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default LlistaNotes;
