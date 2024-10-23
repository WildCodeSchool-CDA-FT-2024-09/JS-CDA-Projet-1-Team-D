import { extendTheme } from "@mui/joy/styles";

// Theme de couleurs personnalisé avec JoyUI
export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // Couleurs primaires, allant du plus clair au plus foncé, 500 est la principale
        primary: {
          // Blanc
          50: "#FEFDF9",
          // Fond beige
          100: "#FBF7E5",
          // Orange clair
          300: "#F7A990",
          // Orange primaire
          500: "#F6A377",
        },
        text: {
          primary: "#414141",
        },
      },
    },
  },
});
