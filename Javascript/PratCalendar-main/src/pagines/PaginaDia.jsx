import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  IconButton,
  Stack,
  Fab,
  Divider,
} from '@mui/material';
import {
  ArrowBack as IconaTornar,
  Add as IconaAfegir,
  CalendarToday as IconaData,
} from '@mui/icons-material';
import { format, parseISO } from 'date-fns';
import { ca } from 'date-fns/locale';
import BarraNavegacio from '../components/BarraNavegacio';
import FormulariNota from '../components/FormulariNota';
import LlistaNotes from '../components/LlistaNotes';
import ResumDia from '../components/ResumDia';
import Carregant from '../components/Carregant';

const PaginaDia = ({ usuari, alTancarSessio }) => {
  const { data } = useParams();
  const navegar = useNavigate();
  const [dataSeleccionada, establirDataSeleccionada] = useState(null);
  const [notes, establirNotes] = useState([]);
  const [carregant, establirCarregant] = useState(false);
  const [mostrarFormulari, establirMostrarFormulari] = useState(false);
  const [notaEditar, establirNotaEditar] = useState(null);

  useEffect(() => {
    if (data) {
      try {
        const dataParsejada = parseISO(data);
        establirDataSeleccionada(dataParsejada);
        carregarNotes(data);
      } catch (error) {
        console.error('Error parsejant la data:', error);
        navegar('/calendari');
      }
    }
  }, [data, navegar]);

  const carregarNotes = async (dataStr) => {
    establirCarregant(true);
    try {
      // Aquí aniria la crida a l'API per obtenir les notes del dia
      // const resposta = await fetch(`/api/notes?data=${dataStr}`);
      // const dades = await resposta.json();
      // establirNotes(dades.notes);

      // Dades de mostra temporal
      establirNotes([
        {
          id: 1,
          contingut_text: 'Reunió amb el tutor per revisar el projecte final',
          data_creacio: new Date().toISOString(),
          ruta_fitxer: null,
          etiquetes: ['Important', 'M07'],
        },
        {
          id: 2,
          contingut_text: 'Estudiar els capítols 3 i 4 per a l\'examen de matemàtiques',
          data_creacio: new Date().toISOString(),
          ruta_fitxer: null,
          etiquetes: ['Examen', 'Matemàtiques'],
        },
        {
          id: 3,
          contingut_text: 'Entregar la pràctica de programació',
          data_creacio: new Date().toISOString(),
          ruta_fitxer: 'practica_programacio.pdf',
          etiquetes: ['Tasca', 'Programació'],
        },
      ]);
    } catch (error) {
      console.error('Error carregant notes:', error);
    } finally {
      establirCarregant(false);
    }
  };

  const gestinarTornar = () => {
    navegar('/calendari');
  };

  const gestinarAfegirNota = () => {
    establirNotaEditar(null);
    establirMostrarFormulari(true);
  };

  const gestinarEditarNota = (nota) => {
    establirNotaEditar(nota);
    establirMostrarFormulari(true);
  };

  const gestinarEsborrarNota = (idNota) => {
    // Aquí aniria la crida a l'API per esborrar la nota
    establirNotes(notes.filter((n) => n.id !== idNota));
  };

  const gestinarDesarNota = (notaDades) => {
    if (notaEditar) {
      // Editar nota existent
      establirNotes(
        notes.map((n) => (n.id === notaEditar.id ? { ...n, ...notaDades } : n))
      );
    } else {
      // Afegir nova nota
      const novaNota = {
        id: Date.now(),
        ...notaDades,
        data_creacio: new Date().toISOString(),
      };
      establirNotes([...notes, novaNota]);
    }
    establirMostrarFormulari(false);
    establirNotaEditar(null);
  };

  const gestinarTancarFormulari = () => {
    establirMostrarFormulari(false);
    establirNotaEditar(null);
  };

  if (!dataSeleccionada) {
    return <Carregant missatge="Carregant dia..." />;
  }

  const dataFormatada = format(dataSeleccionada, "d 'de' MMMM 'de' yyyy", {
    locale: ca,
  });
  const diaDeLaSetmana = format(dataSeleccionada, 'EEEE', { locale: ca });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BarraNavegacio
        nomUsuari={usuari.nom}
        emailUsuari={usuari.email}
        avatarUrl={usuari.avatar}
        alTancarSessio={alTancarSessio}
      />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {/* Capçalera de la vista diària */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              onClick={gestinarTornar}
              aria-label="tornar al calendari"
              size="large"
            >
              <IconaTornar />
            </IconButton>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={600}>
                {dataFormatada}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ textTransform: 'capitalize' }}
              >
                {diaDeLaSetmana}
              </Typography>
            </Box>
          </Stack>
          <IconaData sx={{ fontSize: 48, color: 'primary.main', opacity: 0.3 }} />
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {carregant ? (
          <Carregant missatge="Carregant notes..." />
        ) : (
          <Box>
            {/* Resum del dia */}
            <ResumDia notes={notes} data={dataSeleccionada} />

            <Divider sx={{ my: 4 }} />

            {/* Llista de notes */}
            <LlistaNotes
              notes={notes}
              alEditar={gestinarEditarNota}
              alEsborrar={gestinarEsborrarNota}
            />
          </Box>
        )}

        {/* Botó flotant per afegir nota */}
        <Fab
          color="primary"
          aria-label="afegir nota"
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
          }}
          onClick={gestinarAfegirNota}
        >
          <IconaAfegir />
        </Fab>

        {/* Formulari de nota (modal) */}
        {mostrarFormulari && (
          <FormulariNota
            nota={notaEditar}
            obert={mostrarFormulari}
            alTancar={gestinarTancarFormulari}
            alDesar={gestinarDesarNota}
          />
        )}
      </Container>
    </Box>
  );
};

export default PaginaDia;
