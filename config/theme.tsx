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
});
export default theme;
