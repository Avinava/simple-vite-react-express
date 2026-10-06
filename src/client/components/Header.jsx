import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link as RouterLink, NavLink } from 'react-router';
import { useAppContext } from '../context/AppContext';

const NAV_ITEMS = [
  { to: '/contacts', label: 'Contacts' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/projects', label: 'Projects' },
];

const Header = () => {
  const { isDarkMode, toggleTheme } = useAppContext();
  const [menuAnchor, setMenuAnchor] = useState(null);

  return (
    <AppBar
      position="static"
      component="header"
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, mb: 4 }}
    >
      <Toolbar>
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <img height={40} src="/template-logo.png" alt="" />
          <Typography component="span" sx={{ ml: 1, fontWeight: 500 }}>
            simple-vite-react-express
          </Typography>
        </Box>

        {/* Inline links on tablet and up */}
        <Box component="nav" aria-label="Main" sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {NAV_ITEMS.map(({ to, label }) => (
            <Button
              key={to}
              component={NavLink}
              to={to}
              color="inherit"
              sx={{ '&.active': { fontWeight: 700, textDecoration: 'underline' } }}
            >
              {label}
            </Button>
          ))}
        </Box>

        <Tooltip title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        {/* Hamburger menu on phones */}
        <IconButton
          color="inherit"
          aria-label="Open navigation menu"
          aria-haspopup="true"
          onClick={(event) => setMenuAnchor(event.currentTarget)}
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
          {NAV_ITEMS.map(({ to, label }) => (
            <MenuItem key={to} component={NavLink} to={to} onClick={() => setMenuAnchor(null)}>
              {label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
