import React, { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BarraNavegacio from '../components/BarraNavegacio';
import CapcaleraCalendari from '../components/CapcaleraCalendari';
import GridCalendari from '../components/GridCalendari';
import PanellEtiquetes from '../components/PanellEtiquetes';
import LlistaDiesFiltrats from '../components/LlistaDiesFiltrats';
import Carregant from '../components/Carregant';
import { format, parseISO } from 'date-fns';

const PaginaCalendari = ({ usuari, alTancarSessio }) => {
  const navegar = useNavigate();
  const [dataActual, establirDataActual] = useState(new Date());
  const [diesAmbNotes, establirDiesAmbNotes] = useState([]);
  const [totesLesNotes, establirTotesLesNotes] = useState([]);
  const [etiquetes, establirEtiquetes] = useState([]);
  const [etiquetaSeleccionada, establirEtiquetaSeleccionada] = useState(null);
  const [diesFiltrats, establirDiesFiltrats] = useState([]);
  const [mostrarDialogFiltrats, establirMostrarDialogFiltrats] = useState(false);
  const [carregant, establirCarregant] = useState(false);

  // Carregar dies amb notes del mes actual
  useEffect(() => {
    carregarDiesAmbNotes();
  }, [dataActual]);

  const carregarDiesAmbNotes = async () => {
    establirCarregant(true);
    try {
      // Aquí aniria la crida a l'API per obtenir els dies amb notes
      // const resposta = await fetch(`/api/notes/dies?mes=${format(dataActual, 'yyyy-MM')}`);
      // const dades = await resposta.json();
      // establirDiesAmbNotes(dades.diesAmbNotes);
      // establirTotesLesNotes(dades.notes);

      // Dades de mostra temporal amb notes i etiquetes
      const notesMostra = [
        {
          id: 1,
          data: '2024-11-15',
          contingut_text: 'Reunió amb el tutor per revisar el projecte final',
          etiquetes: ['Important', 'M07', 'Reunió'],
        },
        {
          id: 2,
          data: '2024-11-15',
          contingut_text: 'Preparar presentació del projecte',
          etiquetes: ['M07', 'Tasca'],
        },
        {
          id: 3,
          data: '2024-11-20',
          contingut_text: 'Examen de matemàtiques',
          etiquetes: ['Examen', 'Matemàtiques', 'Important'],
        },
        {
          id: 4,
          data: '2024-11-20',
          contingut_text: 'Estudiar capítols 3 i 4',
          etiquetes: ['Matemàtiques', 'Estudi'],
        },
        {
          id: 5,
          data: '2024-11-25',
          contingut_text: 'Entregar pràctica de programació',
          etiquetes: ['Tasca', 'Programació', 'Important'],
        },
        {
          id: 6,
          data: '2024-11-25',
          contingut_text: 'Revisió de codi amb el professor',
          etiquetes: ['Programació', 'Reunió'],
        },
        {
          id: 7,
          data: '2024-11-28',
          contingut_text: 'Pràctica de laboratori de física',
          etiquetes: ['Física', 'Pràctica'],
        },
      ];

      establirTotesLesNotes(notesMostra);

      // Extreure dies únics amb notes
      const diesUnics = [
        ...new Set(notesMostra.map((nota) => nota.data)),
      ].map((data) => parseISO(data));

      establirDiesAmbNotes(diesUnics);

      // Calcular etiquetes i comptadors
      calcularEtiquetes(notesMostra);
    } catch (error) {
      console.error('Error carregant dies amb notes:', error);
    } finally {
      establirCarregant(false);
    }
  };

  const calcularEtiquetes = (notes) => {
    const comptadorEtiquetes = {};

    notes.forEach((nota) => {
      if (nota.etiquetes) {
        nota.etiquetes.forEach((etiqueta) => {
          comptadorEtiquetes[etiqueta] = (comptadorEtiquetes[etiqueta] || 0) + 1;
        });
      }
    });

    const etiquetesArray = Object.entries(comptadorEtiquetes).map(
      ([nom, comptador]) => ({
        nom,
        comptador,
      })
    );

    establirEtiquetes(etiquetesArray);
  };

  const gestinarCanviMes = (novaMes) => {
    establirDataActual(novaMes);
  };

  const gestinarAnarAvui = () => {
    establirDataActual(new Date());
  };

  const gestinarSeleccioDia = (dia) => {
    const dataFormatada = format(dia, 'yyyy-MM-dd');
    navegar(`/dia/${dataFormatada}`);
  };

  const gestinarSeleccioEtiqueta = (etiqueta) => {
    establirEtiquetaSeleccionada(etiqueta);

    if (etiqueta) {
      // Filtrar notes per etiqueta
      const notesFiltrades = totesLesNotes.filter(
        (nota) => nota.etiquetes && nota.etiquetes.includes(etiqueta)
      );

      // Agrupar notes per dia
      const diesPerData = {};
      notesFiltrades.forEach((nota) => {
        if (!diesPerData[nota.data]) {
          diesPerData[nota.data] = {
            data: parseISO(nota.data),
            notes: [],
          };
        }
        diesPerData[nota.data].notes.push(nota);
      });

      const diesArray = Object.values(diesPerData);
      establirDiesFiltrats(diesArray);
      establirMostrarDialogFiltrats(true);
    }
  };

  const gestinarTancarDialog = () => {
    establirMostrarDialogFiltrats(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BarraNavegacio
        nomUsuari={usuari.nom}
        emailUsuari={usuari.email}
        avatarUrl={usuari.avatar}
        alTancarSessio={alTancarSessio}
      />

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <CapcaleraCalendari
          dataActual={dataActual}
          alCanviarMes={gestinarCanviMes}
          alAnarAvui={gestinarAnarAvui}
        />

        {carregant ? (
          <Carregant missatge="Carregant calendari..." />
        ) : (
          <Box>
            {/* Calendari */}
            <GridCalendari
              dataActual={dataActual}
              diesAmbNotes={diesAmbNotes}
              alSeleccionarDia={gestinarSeleccioDia}
            />

            {/* Panell d'etiquetes sota el calendari */}
            <Box sx={{ mt: 4 }}>
              <PanellEtiquetes
                etiquetes={etiquetes}
                etiquetaSeleccionada={etiquetaSeleccionada}
                alSeleccionarEtiqueta={gestinarSeleccioEtiqueta}
              />
            </Box>
          </Box>
        )}
      </Container>

      {/* Dialog amb dies filtrats per etiqueta */}
      <LlistaDiesFiltrats
        obert={mostrarDialogFiltrats}
        alTancar={gestinarTancarDialog}
        etiqueta={etiquetaSeleccionada}
        diesAmbEtiqueta={diesFiltrats}
        alSeleccionarDia={gestinarSeleccioDia}
      />
    </Box>
  );
};

export default PaginaCalendari;
