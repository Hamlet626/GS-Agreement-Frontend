import { styled } from "@stitches/react";
import { Paper } from "@mui/material";
import {theme} from "../../config/theme";

export const Wrapper = styled(Paper, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  padding: "2rem 1rem",
  boxShadow: theme.shadows.$mainShadow,
});
