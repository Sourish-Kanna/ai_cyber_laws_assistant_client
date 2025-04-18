import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";

export const demoTheme = createTheme({
    spacing: 8,
    cssVariables: {
      colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: green[500],
            light: green[300],
            dark: green[700],
            contrastText: "#fff",
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: green[700],
            light: green[500],
            dark: green[900],
            contrastText: "#fff",
          },
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });