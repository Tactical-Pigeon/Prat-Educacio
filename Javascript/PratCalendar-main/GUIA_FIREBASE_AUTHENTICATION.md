# Guía Completa: Implementar Firebase Authentication en PratCalendar

Esta guía detalla paso a paso cómo integrar Firebase Authentication con Google Sign-In en tu proyecto PratCalendar.

## Tabla de Contenidos
1. [Prerrequisitos](#prerrequisitos)
2. [Configuración de Firebase Console](#configuración-de-firebase-console)
3. [Instalación de Dependencias](#instalación-de-dependencias)
4. [Configuración de Firebase en el Proyecto](#configuración-de-firebase-en-el-proyecto)
5. [Implementación de la Autenticación](#implementación-de-la-autenticación)
6. [Modificaciones en los Componentes](#modificaciones-en-los-componentes)
7. [Variables de Entorno](#variables-de-entorno)
8. [Pruebas y Verificación](#pruebas-y-verificación)
9. [Solución de Problemas Comunes](#solución-de-problemas-comunes)

---

## 1. Prerrequisitos

Antes de comenzar, asegúrate de tener:
- Una cuenta de Google
- Node.js y npm instalados en tu sistema
- El proyecto PratCalendar funcionando localmente
- Acceso a la consola de Firebase (https://console.firebase.google.com)

---

## 2. Configuración de Firebase Console

### Paso 2.1: Crear un Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz clic en **"Agregar proyecto"** o **"Add project"**
3. Introduce el nombre del proyecto: `PratCalendar` (o el nombre que prefieras)
4. (Opcional) Desactiva Google Analytics si no lo necesitas
5. Haz clic en **"Crear proyecto"**
6. Espera a que se cree el proyecto y haz clic en **"Continuar"**

### Paso 2.2: Registrar tu Aplicación Web

1. En la página de inicio de tu proyecto Firebase, haz clic en el icono **Web** (`</>`)
2. Registra la aplicación:
   - **Nombre de la app**: `PratCalendar Web`
   - **No** marques "Firebase Hosting" por ahora
3. Haz clic en **"Registrar app"**
4. **IMPORTANTE**: Copia toda la configuración de Firebase que aparece. Se verá así:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "pratcalendar-xxxxx.firebaseapp.com",
  projectId: "pratcalendar-xxxxx",
  storageBucket: "pratcalendar-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

5. **Guarda esta configuración** en un lugar seguro, la necesitarás más adelante
6. Haz clic en **"Continuar a la consola"**

### Paso 2.3: Habilitar Autenticación con Google

1. En el menú lateral de Firebase Console, haz clic en **"Authentication"** (Autenticación)
2. Haz clic en **"Get started"** o **"Comenzar"**
3. Ve a la pestaña **"Sign-in method"** (Método de inicio de sesión)
4. Busca **"Google"** en la lista de proveedores
5. Haz clic en **"Google"**
6. Activa el interruptor para **"Habilitar"**
7. Configura los siguientes campos:
   - **Nombre público del proyecto**: `PratCalendar`
   - **Correo electrónico de asistencia del proyecto**: tu correo electrónico
8. Haz clic en **"Guardar"**

### Paso 2.4: Configurar Dominios Autorizados

1. En la pestaña **"Settings"** (Configuración) de Authentication
2. Verifica que `localhost` esté en la lista de **"Authorized domains"** (dominios autorizados)
3. Si planeas desplegar la aplicación, añade tu dominio de producción aquí más adelante

---

## 3. Instalación de Dependencias

Instala las librerías necesarias de Firebase ejecutando este comando en la terminal desde la raíz de tu proyecto:

```bash
npm install firebase
```

**Nota**: Asegúrate de estar en el directorio `c:\Users\ignac\React\pratcalendar` antes de ejecutar el comando.

Espera a que termine la instalación. Debería añadir `firebase` a las dependencias en tu `package.json`.

---

## 4. Configuración de Firebase en el Proyecto

### Paso 4.1: Crear el Archivo de Configuración

Crea un nuevo archivo llamado `firebase.js` en la carpeta `src/` con la siguiente estructura:

**Ruta del archivo**: `src/firebase.js`

```javascript
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Configuración de Firebase (reemplaza con tus valores del Paso 2.2)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firebase Authentication
export const auth = getAuth(app);

// Configurar el proveedor de Google
export const googleProvider = new GoogleAuthProvider();

// Configuración adicional del proveedor de Google (opcional)
googleProvider.setCustomParameters({
  prompt: 'select_account', // Fuerza la selección de cuenta cada vez
});

export default app;
```

**Importante**: No escribas directamente tus claves de API en este archivo. Usaremos variables de entorno en el siguiente paso.

---

## 5. Variables de Entorno

### Paso 5.1: Crear el Archivo .env

Crea un archivo llamado `.env` en la **raíz** de tu proyecto (al mismo nivel que `package.json`):

**Ruta del archivo**: `.env`

```env
# Configuración de Firebase
REACT_APP_FIREBASE_API_KEY=tu_api_key_aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_auth_domain_aqui
REACT_APP_FIREBASE_PROJECT_ID=tu_project_id_aqui
REACT_APP_FIREBASE_STORAGE_BUCKET=tu_storage_bucket_aqui
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id_aqui
REACT_APP_FIREBASE_APP_ID=tu_app_id_aqui
```

### Paso 5.2: Rellenar las Variables

Reemplaza cada valor con los datos que copiaste en el **Paso 2.2**. Por ejemplo:

```env
REACT_APP_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=pratcalendar-xxxxx.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=pratcalendar-xxxxx
REACT_APP_FIREBASE_STORAGE_BUCKET=pratcalendar-xxxxx.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

### Paso 5.3: Crear .env.example (Opcional pero Recomendado)

Crea un archivo `.env.example` para documentar qué variables se necesitan:

**Ruta del archivo**: `.env.example`

```env
# Configuración de Firebase
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

### Paso 5.4: Actualizar .gitignore

Asegúrate de que tu archivo `.gitignore` incluya `.env` para no subir las credenciales a Git:

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

**Verifica** que la línea `.env` esté presente en el archivo `.gitignore`.

---

## 6. Implementación de la Autenticación

### Paso 6.1: Crear Hook Personalizado para Auth

Crea una carpeta `hooks` dentro de `src/` y un archivo para manejar la autenticación:

**Ruta del archivo**: `src/hooks/useAuth.js`

```javascript
// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export const useAuth = () => {
  const [usuari, establirUsuari] = useState(null);
  const [carregant, establirCarregant] = useState(true);
  const [error, establirError] = useState(null);

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuario autenticado
        establirUsuari({
          id: user.uid,
          nom: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        });
      } else {
        // Usuario no autenticado
        establirUsuari(null);
      }
      establirCarregant(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Función para iniciar sesión con Google
  const accedirAmbGoogle = async () => {
    try {
      establirError(null);
      const result = await signInWithPopup(auth, googleProvider);
      // El estado del usuario se actualizará automáticamente por onAuthStateChanged
      return result.user;
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      establirError(error.message);
      throw error;
    }
  };

  // Función para cerrar sesión
  const tancarSessio = async () => {
    try {
      establirError(null);
      await signOut(auth);
      // El estado del usuario se actualizará automáticamente por onAuthStateChanged
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      establirError(error.message);
      throw error;
    }
  };

  return {
    usuari,
    carregant,
    error,
    accedirAmbGoogle,
    tancarSessio,
  };
};
```

---

## 7. Modificaciones en los Componentes

### Paso 7.1: Actualizar App.jsx

Reemplaza el contenido de `src/App.jsx` con el siguiente código:

```javascript
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import temaPratCalendar from './tema/temaPratCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ca } from 'date-fns/locale';
import PaginaLogin from './pagines/PaginaLogin';
import PaginaCalendari from './pagines/PaginaCalendari';
import PaginaDia from './pagines/PaginaDia';
import Carregant from './components/Carregant';
import { useAuth } from './hooks/useAuth';

function App() {
  // Usar el hook personalizado de autenticación
  const { usuari, carregant, accedirAmbGoogle, tancarSessio } = useAuth();

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (carregant) {
    return <Carregant />;
  }

  return (
    <ThemeProvider theme={temaPratCalendar}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ca}>
        <Router>
          <Routes>
            {/* Ruta de login */}
            <Route
              path="/login"
              element={
                usuari ? (
                  <Navigate to="/calendari" replace />
                ) : (
                  <PaginaLogin alAccedirAmbGoogle={accedirAmbGoogle} />
                )
              }
            />

            {/* Ruta del calendari */}
            <Route
              path="/calendari"
              element={
                usuari ? (
                  <PaginaCalendari
                    usuari={usuari}
                    alTancarSessio={tancarSessio}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Ruta de la vista diària */}
            <Route
              path="/dia/:data"
              element={
                usuari ? (
                  <PaginaDia
                    usuari={usuari}
                    alTancarSessio={tancarSessio}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Redirecció per defecte */}
            <Route
              path="/"
              element={<Navigate to={usuari ? "/calendari" : "/login"} replace />}
            />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
```

**Cambios realizados**:
- Se eliminó el `useState` para el usuario (ahora viene del hook `useAuth`)
- Se importó el hook `useAuth` y el componente `Carregant`
- Se usa el estado `carregant` para mostrar una pantalla de carga
- Las funciones `accedirAmbGoogle` y `tancarSessio` ahora vienen del hook

### Paso 7.2: Actualizar PaginaLogin.jsx

Reemplaza el contenido de `src/pagines/PaginaLogin.jsx` con:

```javascript
// src/pagines/PaginaLogin.jsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import {
  CalendarMonth as IconaCalendari,
  Google as IconaGoogle,
} from '@mui/icons-material';

const PaginaLogin = ({ alAccedirAmbGoogle }) => {
  const [carregant, establirCarregant] = useState(false);
  const [error, establirError] = useState(null);

  const gestinarClickLogin = async () => {
    try {
      establirCarregant(true);
      establirError(null);
      await alAccedirAmbGoogle();
    } catch (error) {
      console.error('Error en el login:', error);
      establirError('No s\'ha pogut iniciar sessió. Si us plau, torna-ho a intentar.');
    } finally {
      establirCarregant(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          {/* Logo i títol */}
          <Stack spacing={2} alignItems="center" mb={4}>
            <IconaCalendari
              sx={{
                fontSize: 80,
                color: 'primary.main',
              }}
            />
            <Typography variant="h3" component="h1" fontWeight={700}>
              PratCalendar
            </Typography>
            <Typography variant="h6" color="text.secondary">
              El teu calendari acadèmic personalitzat
            </Typography>
          </Stack>

          {/* Descripció */}
          <Typography variant="body1" color="text.secondary" mb={4}>
            Organitza les teves tasques, apunts i esdeveniments diaris.
            Inicia sessió amb el teu compte de Google per començar.
          </Typography>

          {/* Mostrar error si existe */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Botó de Google Login */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<IconaGoogle />}
              onClick={gestinarClickLogin}
              disabled={carregant}
              sx={{
                backgroundColor: 'white',
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                '&:disabled': {
                  backgroundColor: '#e0e0e0',
                },
                textTransform: 'none',
                fontSize: '16px',
                px: 3,
                py: 1.5,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {carregant ? 'Iniciant sessió...' : 'Inicia sessió amb Google'}
            </Button>
          </Box>

          {/* Informació addicional */}
          <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
            En iniciar sessió, acceptes els nostres termes i condicions
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PaginaLogin;
```

**Cambios realizados**:
- Se eliminó la nota de "demostración"
- Se añadió manejo de estados de carga y error
- El botón ahora muestra "Iniciant sessió..." mientras carga
- Se usa `async/await` para manejar la autenticación de forma asíncrona
- Se muestra un mensaje de error si falla la autenticación

---

## 8. Pruebas y Verificación

### Paso 8.1: Reiniciar el Servidor de Desarrollo

Si el servidor estaba corriendo, **detén el servidor** (Ctrl+C en la terminal) y vuelve a iniciarlo:

```bash
npm start
```

**Importante**: Debes reiniciar el servidor cada vez que modifiques el archivo `.env` para que las variables de entorno se carguen correctamente.

### Paso 8.2: Probar la Autenticación

1. Abre tu navegador en `http://localhost:3000`
2. Deberías ver la página de login
3. Haz clic en el botón **"Inicia sessió amb Google"**
4. Se abrirá una ventana emergente de Google
5. Selecciona tu cuenta de Google
6. Acepta los permisos solicitados
7. Deberías ser redirigido automáticamente a `/calendari`
8. Verifica que tu nombre y avatar aparezcan en la barra de navegación

### Paso 8.3: Probar el Cierre de Sesión

1. En la barra de navegación, haz clic en tu avatar
2. Selecciona **"Tancar sessió"** del menú
3. Deberías ser redirigido a la página de login
4. Verifica que ya no puedas acceder a `/calendari` sin autenticarte

### Paso 8.4: Verificar la Persistencia de Sesión

1. Inicia sesión con Google
2. Cierra completamente el navegador
3. Abre el navegador de nuevo y ve a `http://localhost:3000`
4. Deberías estar **automáticamente autenticado** y ver el calendario

**Nota**: Firebase Authentication mantiene la sesión activa por defecto usando localStorage.

---

## 9. Solución de Problemas Comunes

### Problema 1: Error "Firebase: Error (auth/popup-blocked)"

**Causa**: El navegador bloqueó la ventana emergente de Google.

**Solución**:
- Permite ventanas emergentes para `localhost` en la configuración de tu navegador
- O usa `signInWithRedirect` en lugar de `signInWithPopup` (requiere cambios en el código)

### Problema 2: Variables de entorno no definidas

**Síntomas**: Error en consola: "Firebase: Error (auth/invalid-api-key)"

**Solución**:
1. Verifica que el archivo `.env` esté en la raíz del proyecto
2. Verifica que todas las variables empiecen con `REACT_APP_`
3. Reinicia el servidor de desarrollo (`npm start`)
4. Limpia la caché de React: elimina la carpeta `node_modules/.cache` y reinicia

### Problema 3: Error "Firebase: Error (auth/unauthorized-domain)"

**Causa**: El dominio desde el cual estás haciendo login no está autorizado.

**Solución**:
1. Ve a Firebase Console > Authentication > Settings
2. En "Authorized domains", añade `localhost`
3. Si usas otro puerto, añade también `localhost:3000` o el puerto que uses

### Problema 4: La sesión no persiste al recargar

**Causa**: Puede ser un problema con localStorage o configuración de Firebase.

**Solución**:
1. Verifica que no estés usando el modo incógnito del navegador
2. Limpia las cookies y localStorage del navegador
3. Verifica que `onAuthStateChanged` esté correctamente implementado en `useAuth.js`

### Problema 5: Pantalla en blanco después del login

**Causa**: Posible error en la redirección o en el componente `Carregant`.

**Solución**:
1. Abre la consola del navegador (F12) y busca errores
2. Verifica que el componente `Carregant` esté importado correctamente en `App.jsx`
3. Verifica que todas las rutas estén correctamente definidas

### Problema 6: npm install falla

**Solución**:
1. Elimina la carpeta `node_modules`
2. Elimina el archivo `package-lock.json`
3. Ejecuta `npm cache clean --force`
4. Ejecuta `npm install` de nuevo

---

## Resumen de Archivos Creados/Modificados

### Archivos Creados:
- `src/firebase.js` - Configuración de Firebase
- `src/hooks/useAuth.js` - Hook personalizado para autenticación
- `.env` - Variables de entorno (no subir a Git)
- `.env.example` - Plantilla de variables de entorno

### Archivos Modificados:
- `src/App.jsx` - Integración del hook useAuth
- `src/pagines/PaginaLogin.jsx` - Autenticación real con Firebase
- `package.json` - Añadida dependencia firebase (automático con npm install)
- `.gitignore` - Asegurar que .env esté ignorado

---

## Próximos Pasos (Opcional)

Una vez que tengas la autenticación funcionando, puedes considerar:

1. **Firestore Database**: Guardar las notas y eventos del calendario en Firestore
2. **Sincronización en tiempo real**: Actualizar el calendario automáticamente
3. **Perfiles de usuario**: Almacenar preferencias del usuario
4. **Despliegue**: Configurar Firebase Hosting para publicar la aplicación
5. **Seguridad**: Implementar reglas de seguridad en Firestore

---

## Recursos Adicionales

- [Documentación oficial de Firebase Authentication](https://firebase.google.com/docs/auth)
- [Documentación de Firebase para Web](https://firebase.google.com/docs/web/setup)
- [Guía de Google Sign-In](https://firebase.google.com/docs/auth/web/google-signin)

---

## Notas Finales

- **Seguridad**: Nunca subas el archivo `.env` a Git. Usa `.env.example` para documentar.
- **Producción**: Para producción, configura las variables de entorno en tu servicio de hosting.
- **Costes**: Firebase tiene un plan gratuito generoso, pero revisa los límites en [Firebase Pricing](https://firebase.google.com/pricing).

---

**¡Buena suerte con la implementación!** Si tienes algún problema, revisa la sección de "Solución de Problemas Comunes" o consulta la documentación oficial de Firebase.
