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
          // Hover
          600: "#E65A0F",
          // Active
          700: "#BC6232",
        },
        text: {
          primary: "#414141",
          secondary: "#0B0500",
        },
      },
    },
  },
  components: {
    JoyTypography: {
      defaultProps: {
        levelMapping: {
          h1: "h2",
          h2: "h2",
          h3: "h3",
          h4: "h3",
          "title-lg": "p",
          "title-md": "p",
          "title-sm": "p",
          "body-md": "p",
          "body-sm": "p",
          "body-xs": "span",
        },
      },
    },
  },
});
