import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    primary: {
      main: "#dea27a",
      light: "#fff7f2",
    },
    secondary: {
      main: "#0c273a",
    },
    error: {
      main: red.A400,
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
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...{
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.primary.light,
            fontSize: "0.75rem",
            fontWeight: 600,
            margin: "0 1px",
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
export default theme;
