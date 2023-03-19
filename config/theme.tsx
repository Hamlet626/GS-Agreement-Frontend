import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const theme = {
  colors: {
    $primaryMain: "#dea27a",
    $primaryLight: "#fff7f2",
    $secondaryMain: "#0c273a",
    $error: red.A400,
    $warning: "#664d03",
    $white: "#ffffff",
  }
}

export const materialTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.$primaryMain,
      light: theme.colors.$primaryLight,
    },
    secondary: {
      main: theme.colors.$secondaryMain,
    },
    error: {
      main: theme.colors.$error,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === "h2" && {
            fontWeight: 700,
            fontSize: "25px",
            lineHeight: "1.167",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: "0.35em",

            "&::after": {
              content: "''",
              width: "55px",
              display: "block",
              margin: "8px auto 0",
              borderBottom: `6px solid ${theme.palette.primary.main}`,
            },
          }),
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" && {
            size: "large",
          }),
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...{
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.light,
            fontSize: "0.75rem",
            fontWeight: 600,
            margin: "0 1px",
            textTransform: "none",
            "&:focus, &:active": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.light,
            },
          },
        }),
      },
    },
  },
});
