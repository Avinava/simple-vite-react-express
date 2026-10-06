import { createTheme } from '@mui/material/styles';

/**
 * Build the MUI theme for a color mode.
 * @param {'light'|'dark'} mode
 */
export const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#aac7ff',
        light: '#dde5ff',
        dark: '#7b9cff',
      },
      secondary: {
        main: '#bec6dc',
        light: '#eef1f8',
        dark: '#929ab3',
      },
      ...(mode === 'light'
        ? {
            background: { default: '#f5f5f5', paper: '#ffffff' },
          }
        : {
            background: { default: '#121212', paper: '#1e1e1e' },
          }),
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      h6: {
        fontWeight: 500,
      },
      subtitle1: {
        fontSize: '1rem',
      },
      subtitle2: {
        fontSize: '0.875rem',
      },
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          // Pastel primary needs dark text in both modes for contrast
          root: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
            color: '#0b1b3a',
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: '0.3s',
          },
        },
      },
    },
  });

export default getTheme;
