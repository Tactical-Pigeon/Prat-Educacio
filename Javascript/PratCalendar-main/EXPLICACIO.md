# EXPLICACIÓ DEL PROJECTE PRATCALENDAR

## Visió General

PratCalendar és una aplicació web de calendari acadèmic amb React que permet gestionar notes diàries amb etiquetes. Actualment implementa només la interfície (sense backend).

---

## Estructura de Fitxers

```
src/
├── App.jsx                      # Component principal amb routing i autenticació
├── index.js                     # Punt d'entrada de React
├── tema/
│   └── temaPratCalendar.js     # Configuració de colors i estils Material-UI
├── pagines/
│   ├── PaginaLogin.jsx         # Pantalla d'inici de sessió
│   ├── PaginaCalendari.jsx     # Vista mensual amb calendari i etiquetes
│   └── PaginaDia.jsx           # Vista diària amb notes i resum
└── components/
    ├── BarraNavegacio.jsx      # Barra superior amb usuari i logout
    ├── CapcaleraCalendari.jsx  # Controls de navegació del calendari
    ├── GridCalendari.jsx       # Grid mensual estil Google Calendar
    ├── PanellEtiquetes.jsx     # Panell de filtratge per etiquetes
    ├── LlistaDiesFiltrats.jsx  # Modal amb dies filtrats
    ├── FormulariNota.jsx       # Modal per crear/editar notes
    ├── LlistaNotes.jsx         # Llista de notes d'un dia
    ├── ResumDia.jsx            # Estadístiques del dia
    └── Carregant.jsx           # Spinner de càrrega
```

---

## Funcionament dels Fitxers Principals

### **App.jsx**
- **Què fa**: Gestiona el routing i l'estat d'autenticació global
- **Estat**: `usuari` (objecte amb id, nom, email, avatar)
- **Rutes**:
  - `/login` → PaginaLogin
  - `/calendari` → PaginaCalendari (protegida)
  - `/dia/:data` → PaginaDia (protegida)
- **Interacció**: Passa `usuari` i `alTancarSessio` a les pàgines protegides

### **index.js**
- **Què fa**: Punt d'entrada que renderitza App.jsx al DOM
- **Interacció**: Munta l'aplicació al `<div id="root">` de index.html

---

## Pàgines

### **PaginaLogin.jsx**
- **Què fa**: Mostra pantalla d'inici de sessió amb botó de Google (simulat)
- **Props rebudes**: `alAccedirAmbGoogle(credential)`
- **Interacció**: En fer click al botó, crida `alAccedirAmbGoogle()` que estableix l'usuari a App.jsx

### **PaginaCalendari.jsx**
- **Què fa**: Mostra el calendari mensual i el panell d'etiquetes
- **Estat principal**:
  - `dataActual`: Mes que s'està visualitzant
  - `diesAmbNotes`: Array de dates amb activitat
  - `totesLesNotes`: Notes amb etiquetes (dades de mostra)
  - `etiquetes`: Array d'objectes {nom, comptador}
- **Components fills**:
  - **BarraNavegacio**: Mostra usuari i botó de logout
  - **CapcaleraCalendari**: Botons per navegar entre mesos
  - **GridCalendari**: Renderitza el calendari mensual
  - **PanellEtiquetes**: Mostra etiquetes clickables sota el calendari
  - **LlistaDiesFiltrats**: Modal que s'obre en clicar una etiqueta
- **Interacció**:
  - Click en dia → Navega a `/dia/2024-11-15`
  - Click en etiqueta → Obre modal amb dies filtrats

### **PaginaDia.jsx**
- **Què fa**: Mostra les notes d'un dia específic amb resum
- **Estat principal**:
  - `dataSeleccionada`: Data del dia (des de la URL)
  - `notes`: Array de notes del dia (dades de mostra)
  - `mostrarFormulari`: Boolean per obrir/tancar el modal
  - `notaEditar`: Nota seleccionada per editar o null
- **Components fills**:
  - **BarraNavegacio**: Barra superior
  - **ResumDia**: Targetes amb estadístiques
  - **LlistaNotes**: Notes amb botons d'editar/esborrar
  - **FormulariNota**: Modal per afegir/editar notes
- **Interacció**:
  - Botó FAB (+) → Obre FormulariNota buit
  - Editar → Obre FormulariNota amb dades
  - Esborrar → Elimina nota de l'estat

---

## Components

### **BarraNavegacio.jsx**
- **Props**: `nomUsuari`, `emailUsuari`, `avatarUrl`, `alTancarSessio`
- **Què fa**: Mostra logo, nom d'usuari i menú desplegable amb logout
- **Interacció**: Click en avatar → menú → click "Tancar sessió" → crida `alTancarSessio()`

### **CapcaleraCalendari.jsx**
- **Props**: `dataActual`, `alCanviarMes`, `alAnarAvui`
- **Què fa**: Mostra el mes/any actual i 3 botons de navegació
- **Interacció**: Botons criden callbacks per canviar el mes a PaginaCalendari

### **GridCalendari.jsx**
- **Props**: `dataActual`, `diesAmbNotes`, `alSeleccionarDia`
- **Què fa**: Renderitza un grid de 7 columnes amb tots els dies del mes
- **Lògica**:
  1. Calcula dies del mes + dies adjacents per completar setmanes
  2. Agrupa en setmanes de 7 dies
  3. Renderitza cada dia amb estils especials (avui, amb notes, etc.)
- **Interacció**: Click en dia → crida `alSeleccionarDia(dia)`

### **PanellEtiquetes.jsx**
- **Props**: `etiquetes`, `etiquetaSeleccionada`, `alSeleccionarEtiqueta`
- **Què fa**: Mostra targetes clickables per cada etiqueta amb comptador
- **Layout**: Grid responsive (1/2/4 columnes segons mida de pantalla)
- **Interacció**: Click en etiqueta → crida `alSeleccionarEtiqueta(nom)`

### **LlistaDiesFiltrats.jsx**
- **Props**: `obert`, `alTancar`, `etiqueta`, `diesAmbEtiqueta`, `alSeleccionarDia`
- **Què fa**: Modal que mostra tots els dies amb una etiqueta específica
- **Contingut**: Per cada dia mostra data, notes i un resum
- **Interacció**: Click en dia → navega a `/dia/:data` i tanca modal

### **FormulariNota.jsx**
- **Props**: `nota`, `obert`, `alTancar`, `alDesar`
- **Què fa**: Modal amb formulari per crear/editar notes
- **Camps**:
  - TextField multilínia (text obligatori)
  - Input de fitxer (opcional, simulat)
  - Camp per afegir etiquetes + llista de Chips
- **Interacció**:
  - Desar → valida i crida `alDesar({contingut_text, ruta_fitxer, etiquetes})`
  - Cancel·lar → crida `alTancar()`

### **LlistaNotes.jsx**
- **Props**: `notes`, `alEditar`, `alEsborrar`
- **Què fa**: Renderitza totes les notes en targetes (Cards)
- **Cada targeta mostra**: Text, fitxer, etiquetes, data, botons d'acció
- **Interacció**:
  - Editar → crida `alEditar(nota)`
  - Esborrar → crida `alEsborrar(id)`

### **ResumDia.jsx**
- **Props**: `notes`, `data`
- **Què fa**: Calcula i mostra estadístiques del dia
- **Targetes**:
  1. Total de notes
  2. Fitxers adjunts
  3. Etiquetes úniques
  4. Nivell d'activitat (baix/moderat/alt)
- **Interacció**: Cap, només visual

### **Carregant.jsx**
- **Props**: `missatge`
- **Què fa**: Mostra un spinner amb text mentre carreguen dades
- **Interacció**: Cap, només visual

---

## Flux de Dades

### 1. Autenticació
```
Usuari → PaginaLogin → click botó
  → alAccedirAmbGoogle()
  → App.jsx estableix usuari
  → Redirecció a /calendari
```

### 2. Visualització del Calendari
```
PaginaCalendari → useEffect() → carrega dades de mostra
  → calcularEtiquetes() → estableix estat etiquetes
  → Renderitza GridCalendari + PanellEtiquetes
```

### 3. Click en un Dia
```
GridCalendari → click cel·la
  → alSeleccionarDia(dia)
  → PaginaCalendari → navegar(`/dia/2024-11-15`)
  → PaginaDia carrega
```

### 4. Click en Etiqueta
```
PanellEtiquetes → click targeta
  → alSeleccionarEtiqueta(etiqueta)
  → PaginaCalendari filtra notes
  → Obre LlistaDiesFiltrats (modal)
```

### 5. Gestió de Notes
```
PaginaDia → click FAB (+)
  → establirMostrarFormulari(true)
  → FormulariNota s'obre
  → Usuari omple camps
  → click "Desar"
  → gestinarDesarNota(dades)
  → Actualitza estat notes
  → FormulariNota es tanca
```

---

## Estat i Props (Flux de dades)

### App.jsx (Global)
```
usuari ─┬→ PaginaCalendari
        └→ PaginaDia
```

### PaginaCalendari
```
dataActual ──────→ CapcaleraCalendari
                 → GridCalendari

diesAmbNotes ────→ GridCalendari

etiquetes ───────→ PanellEtiquetes

diesFiltrats ────→ LlistaDiesFiltrats
```

### PaginaDia
```
notes ──┬→ ResumDia
        └→ LlistaNotes

notaEditar ──────→ FormulariNota
```

---

## Dades de Mostra (Hardcoded)

L'aplicació actualment no té backend. Les dades són simulades a:

**PaginaCalendari.jsx**:
```javascript
const notesMostra = [
  {
    id: 1,
    data: '2024-11-15',
    contingut_text: 'Reunió amb el tutor...',
    etiquetes: ['Important', 'M07', 'Reunió'],
  },
  // ... 6 notes més
];
```

**PaginaDia.jsx**:
```javascript
establirNotes([
  { id: 1, contingut_text: 'Reunió...', etiquetes: ['Important', 'M07'] },
  { id: 2, contingut_text: 'Estudiar...', etiquetes: ['Examen'] },
  // ...
]);
```

---

## Tecnologies

- **React 19.2.0**: Llibreria UI
- **React Router 7.9.5**: Navegació entre pàgines
- **Material-UI 7.3.5**: Components UI (Box, Paper, Typography, etc.)
- **date-fns 4.1.0**: Manipulació de dates
- **Emotion**: CSS-in-JS per Material-UI

---

## Com Executar

```bash
npm install    # Instal·lar dependències
npm start      # Iniciar servidor de desenvolupament (http://localhost:3000)
npm run build  # Construir per producció
```

---

## Limitacions Actuals

❌ **Sense backend**: Totes les dades són simulades
❌ **Sense persistència**: Les notes desapareixen en refrescar
❌ **Sense autenticació real**: Google OAuth és simulat
❌ **Sense pujada de fitxers**: Només es guarda el nom del fitxer

---

## Properes Funcionalitats (Fora d'aquest abast)

- API REST amb Node.js/Express
- Base de dades Cloudflare D1 (SQLite)
- Autenticació real amb Google OAuth
- Pujada de fitxers a Cloudflare R2
- Desplegament a Cloudflare Pages

---

**Data**: 13 de novembre de 2024
**Versió**: 0.1 (Interfície completa)
