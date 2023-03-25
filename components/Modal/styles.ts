import { DialogTitle as MaterialDialogTitle } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@stitches/react";
import { theme } from "../../config/theme";

export const DialogTitle = styled(MaterialDialogTitle, {
  display: "flex",
  gap: "1rem",
  margin: "0.5rem 0",
  alignItems: "center",
});

export const Icon = styled(InfoIcon, {
  color: theme.colors.$primaryMain,
  fontSize: "32px",
});
