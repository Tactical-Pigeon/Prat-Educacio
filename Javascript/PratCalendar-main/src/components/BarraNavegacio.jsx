import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  CalendarMonth as IconaCalendari,
  Logout as IconaSortir,
} from '@mui/icons-material';
const BarraNavegacio = ({ nomUsuari, emailUsuari, avatarUrl, alTancarSessio }) => {
  const [ancorageMenuUsuari, establirAncorageMenuUsuari] = React.useState(null);
const menuUsuariObert = Boolean(ancorageMenuUsuari);

  const obrirMenuUsuari = (event) => {
    establirAncorageMenuUsuari(event.currentTarget);
  };
const tancarMenuUsuari = () => {
    establirAncorageMenuUsuari(null);
  };
const gestinarTancamentSessio = () => {
    tancarMenuUsuari();
    alTancarSessio();
  };
return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        {/* Logo i títol */}
        <IconaCalendari sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          PratCalendar
 
        </Typography>

        {/* Informació d'usuari */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {nomUsuari}
          </Typography>
          <IconButton
            onClick={obrirMenuUsuari}
  
           size="small"
            sx={{ ml: 1 }}
            aria-label="menú d'usuari"
            aria-controls={menuUsuariObert ? 'menu-usuari' : undefined}
            aria-haspopup="true"
            aria-expanded={menuUsuariObert ? 'true' : undefined}
          >
        
     <Avatar
              alt={nomUsuari}
              src={avatarUrl}
              sx={{ width: 36, height: 36 }}
            />
          </IconButton>
        </Box>

        {/* Menú desplegable d'usuari */}
       
  <Menu
          id="menu-usuari"
          anchorEl={ancorageMenuUsuari}
          open={menuUsuariObert}
          onClose={tancarMenuUsuari}
          onClick={tancarMenuUsuari}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem 
 disabled>
            <Box>
              <Typography variant="subtitle2">{nomUsuari}</Typography>
              <Typography variant="caption" color="text.secondary">
                {emailUsuari}
              </Typography>
            </Box>
          </MenuItem>
     
      <MenuItem onClick={gestinarTancamentSessio}>
            <IconaSortir fontSize="small" sx={{ mr: 1 }} />
            Tancar sessió
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default BarraNavegacio;