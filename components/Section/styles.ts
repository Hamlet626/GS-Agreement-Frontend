import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Grid } from "@mui/material";
import { styled } from "@stitches/react";
import { theme } from "../../config/theme";

export const SectionsWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginTop: "1rem",
});

export const DocumentTextArea = styled(TextareaAutosize, {
  width: "100%",
  fontSize: "14px",
  resize: "none",
  paddingBlock: "1rem",
  padding: "1rem",
  borderRadius: `${theme.border.$borderRadius}px`,
  "&:focus, &:active": {
    borderColor: theme.colors.$primaryMain,
  },
});

export const DocumentTitle = styled("b", {});

export const SectionHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  justifyContent: "space-between",
});

export const Transcription = styled("p", {
  fontSize: "14px",
  fontStyle: "italic",
  padding: "0 1rem",
});

export const Paragraph = styled("p", {
  fontSize: "14px",
  padding: "1rem",
  overflowWrap: "break-word",
  textAlign: "justify",
  backgroundColor: `${theme.colors.$primaryMain}50`,
  margin: "0",
  borderRadius: `${theme.border.$borderRadius}px`,
  cursor: "pointer",
});
