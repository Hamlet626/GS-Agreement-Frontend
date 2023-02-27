import { styled } from "@stitches/react";
import { DialogTitle as MaterialDialogTitle } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export const DialogTitle = styled(MaterialDialogTitle, {
  display: "flex",
  gap: "1rem",
  margin: "0.5rem 0",
  alignItems: "center",
});

export const Icon = styled(InfoIcon, {
  color: "#dea27a",
  fontSize: "32px",
});
