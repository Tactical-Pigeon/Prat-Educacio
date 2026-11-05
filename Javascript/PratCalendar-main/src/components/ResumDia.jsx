import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Grid,
  Chip,
} from '@mui/material';
import {
  StickyNote2 as IconaNotes,
  Label as IconaEtiquetes,
  AttachFile as IconaFitxers,
  TrendingUp as IconaActivitat,
} from '@mui/icons-material';

const ResumDia = ({ notes, data }) => {
  // Estadístiques del dia
  const totalNotes = notes.length;
  const notesAmbFitxers = notes.filter((n) => n.ruta_fitxer).length;

  // Recopila totes les etiquetes úniques
  const etiquetesUniques = [
    ...new Set(notes.flatMap((n) => n.etiquetes || [])),
  ];

  // Determina el nivell d'activitat
  const obtenirNivellActivitat = () => {
    if (totalNotes === 0) return { text: 'Sense activitat', color: 'default' };
    if (totalNotes <= 2) return { text: 'Baixa activitat', color: 'info' };
    if (totalNotes <= 4) return { text: 'Activitat moderada', color: 'success' };
    return { text: 'Alta activitat', color: 'warning' };
  };

  const nivellActivitat = obtenirNivellActivitat();

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <IconaActivitat color="primary" />
        <Typography variant="h5" fontWeight={600}>
          Resum del Dia
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        {/* Targeta: Total de Notes */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2.5,
              textAlign: 'center',
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <IconaNotes sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" fontWeight={700}>
              {totalNotes}
            </Typography>
            <Typography variant="body2">
              {totalNotes === 1 ? 'Nota' : 'Notes'}
            </Typography>
          </Paper>
        </Grid>

        {/* Targeta: Fitxers Adjunts */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2.5,
              textAlign: 'center',
              backgroundColor: 'secondary.main',
              color: 'secondary.contrastText',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <IconaFitxers sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" fontWeight={700}>
              {notesAmbFitxers}
            </Typography>
            <Typography variant="body2">
              {notesAmbFitxers === 1 ? 'Fitxer' : 'Fitxers'}
            </Typography>
          </Paper>
        </Grid>

        {/* Targeta: Etiquetes */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2.5,
              textAlign: 'center',
              backgroundColor: 'success.main',
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <IconaEtiquetes sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" fontWeight={700}>
              {etiquetesUniques.length}
            </Typography>
            <Typography variant="body2">
              {etiquetesUniques.length === 1 ? 'Etiqueta' : 'Etiquetes'}
            </Typography>
          </Paper>
        </Grid>

        {/* Targeta: Nivell d'Activitat */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 2.5,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '140px',
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Nivell d'Activitat
            </Typography>
            <Chip
              label={nivellActivitat.text}
              color={nivellActivitat.color}
              size="medium"
              sx={{ fontWeight: 600, fontSize: '0.9rem' }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Etiquetes utilitzades */}
      {etiquetesUniques.length > 0 && (
        <Paper elevation={1} sx={{ p: 2.5, mt: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Etiquetes utilitzades avui
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {etiquetesUniques.map((etiqueta) => {
              const comptador = notes.filter((n) =>
                n.etiquetes?.includes(etiqueta)
              ).length;
              return (
                <Chip
                  key={etiqueta}
                  label={`${etiqueta} (${comptador})`}
                  color="primary"
                  variant="outlined"
                />
              );
            })}
          </Stack>
        </Paper>
      )}

      {/* Missatge motivacional */}
      {totalNotes > 0 && (
        <Paper
          elevation={1}
          sx={{
            p: 2.5,
            mt: 3,
            backgroundColor: 'info.light',
            border: '1px solid',
            borderColor: 'info.main',
          }}
        >
          <Typography variant="body2" color="info.dark">
            {totalNotes >= 5
              ? "Fantàstic! Has estat molt productiu avui!"
              : totalNotes >= 3
              ? "Molt bé! Estàs organitzant el teu dia correctament."
              : "Bon començament! Continua afegint les teves tasques."}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ResumDia;
