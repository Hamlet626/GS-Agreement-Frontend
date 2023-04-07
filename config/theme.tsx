import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const theme = {
  colors: {
    $primaryMain: "#D9986F",
    $primaryDark: "#F3DDCE",
    $primaryLight: "#FFF7F2",
    $secondaryMain: "#AA7B4F",
    $success: "#DED47A",
    $info: "#BFECF5",
    $error: red.A400,
    $warning: "#664d03",
    $white: "#ffffff",
    $gray: "#C1C1C1"
  },
  shadows: {
    // This shadow style follow the Material UI evelation={5}, it's applied in some Material components
    $mainShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
  },
  border: {
    $borderRadius: 10
  }
};

export const materialTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.$primaryMain,
      dark: theme.colors.$primaryDark,
      light: theme.colors.$primaryLight,
    },
    secondary: {
      main: theme.colors.$secondaryMain,
    },
    success: {
      main: theme.colors.$success,
    },
    info: {
      main: theme.colors.$info,
    },
    error: {
      main: theme.colors.$error,
    },
  },
  shape: {
    borderRadius: theme.border.$borderRadius,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "h2" && {
            fontWeight: 700,
            fontSize: "25px",
            lineHeight: "1.167",
            textTransform: "capitalize",
            marginBottom: "0.35em",
            "&::after": {
              content: "''",
              width: "55px",
              display: "block",
              borderBottom: `6px solid ${theme.colors.$gray}`,
              margin: "8px auto 0",
              ...(ownerState.align === "left" && {
                margin: "8px 0",
              }),
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
    MuiAppBar: {
      styleOverrides: {
        root: () => ({
          ...{
            boxShadow: "none",
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...{
            backgroundColor: theme.palette.primary.dark,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...{
            backgroundColor: theme.palette.primary.light,
          },
        }),
      },
    },
  },
});
