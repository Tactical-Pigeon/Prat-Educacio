import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  Stack,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import {
  Close as IconaTancar,
  AttachFile as IconaFitxer,
  Add as IconaAfegir,
} from '@mui/icons-material';

const FormulariNota = ({ nota, obert, alTancar, alDesar }) => {
  const [contingutText, establirContingutText] = useState('');
  const [rutaFitxer, establirRutaFitxer] = useState('');
  const [etiquetes, establirEtiquetes] = useState([]);
  const [novaEtiqueta, establirNovaEtiqueta] = useState('');

  useEffect(() => {
    if (nota) {
      establirContingutText(nota.contingut_text || '');
      establirRutaFitxer(nota.ruta_fitxer || '');
      establirEtiquetes(nota.etiquetes || []);
    } else {
      netejarnFormulari();
    }
  }, [nota]);

  const netejarnFormulari = () => {
    establirContingutText('');
    establirRutaFitxer('');
    establirEtiquetes([]);
    establirNovaEtiqueta('');
  };

  const gestinarAfegirEtiqueta = () => {
    if (novaEtiqueta.trim() && !etiquetes.includes(novaEtiqueta.trim())) {
      establirEtiquetes([...etiquetes, novaEtiqueta.trim()]);
      establirNovaEtiqueta('');
    }
  };

  const gestinarEsborrarEtiqueta = (etiquetaAEsborrar) => {
    establirEtiquetes(etiquetes.filter((e) => e !== etiquetaAEsborrar));
  };

  const gestinarDesar = () => {
    if (!contingutText.trim()) {
      return;
    }

    alDesar({
      contingut_text: contingutText,
      ruta_fitxer: rutaFitxer || null,
      etiquetes: etiquetes,
    });

    netejarnFormulari();
  };

  const gestinarTancar = () => {
    netejarnFormulari();
    alTancar();
  };

  const gestinarSeleccioFitxer = (event) => {
    const fitxer = event.target.files[0];
    if (fitxer) {
      // En una aplicació real, aquí pujaríem el fitxer al servidor
      establirRutaFitxer(fitxer.name);
    }
  };

  return (
    <Dialog
      open={obert}
      onClose={gestinarTancar}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={600}>
            {nota ? 'Editar Nota' : 'Nova Nota'}
          </Typography>
          <IconButton onClick={gestinarTancar} size="small">
            <IconaTancar />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Camp de text per al contingut */}
          <TextField
            label="Contingut de la nota"
            multiline
            rows={6}
            value={contingutText}
            onChange={(e) => establirContingutText(e.target.value)}
            placeholder="Escriu aquí la teva nota..."
            fullWidth
            autoFocus
          />

          {/* Fitxer adjunt */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Fitxer adjunt (opcional)
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant="outlined"
                component="label"
                startIcon={<IconaFitxer />}
              >
                Seleccionar fitxer
                <input
                  type="file"
                  hidden
                  onChange={gestinarSeleccioFitxer}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
              </Button>
              {rutaFitxer && (
                <Paper sx={{ px: 2, py: 1, backgroundColor: 'action.hover' }}>
                  <Typography variant="body2">{rutaFitxer}</Typography>
                </Paper>
              )}
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Formats acceptats: PDF, DOC, DOCX, TXT, JPG, PNG
            </Typography>
          </Box>

          {/* Etiquetes */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Etiquetes
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <TextField
                size="small"
                value={novaEtiqueta}
                onChange={(e) => establirNovaEtiqueta(e.target.value)}
                placeholder="Nova etiqueta"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    gestinarAfegirEtiqueta();
                  }
                }}
              />
              <IconButton
                color="primary"
                onClick={gestinarAfegirEtiqueta}
                disabled={!novaEtiqueta.trim()}
              >
                <IconaAfegir />
              </IconButton>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {etiquetes.map((etiqueta) => (
                <Chip
                  key={etiqueta}
                  label={etiqueta}
                  onDelete={() => gestinarEsborrarEtiqueta(etiqueta)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={gestinarTancar} color="inherit">
          Cancel·lar
        </Button>
        <Button
          onClick={gestinarDesar}
          variant="contained"
          disabled={!contingutText.trim()}
        >
          {nota ? 'Actualitzar' : 'Desar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormulariNota;
