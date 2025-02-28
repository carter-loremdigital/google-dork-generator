import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "dark", // Enables dark mode for proper contrast
    primary: {
      main: "#02cc02", // green accent
    },
    background: {
      default: "#000000", // black background for the whole app
      paper: "#000000", // black for paper components
    },
    text: {
      primary: "#02cc02", // Green text
    },
  },
  typography: {
    fontFamily: '"Courier New", monospace', // Monospace font for terminal feel
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
  },
});

// Enable responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;
