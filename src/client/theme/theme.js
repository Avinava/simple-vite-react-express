import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#aac7ff",
      light: "#dde5ff",
      dark: "#7b9cff",
    },
    secondary: {
      main: "#bec6dc",
      light: "#eef1f8",
      dark: "#929ab3",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "1rem",
    },
    subtitle2: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#aac7ff",
          color: "#000",
        },
      },
    },
  },
});

export default theme;
