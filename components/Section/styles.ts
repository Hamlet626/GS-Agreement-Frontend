import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Grid } from "@mui/material";
import { styled } from "@stitches/react";
import { theme } from "../../config/theme";

export const SectionsWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "2.5rem",
});

export const DocumentTextArea = styled(TextareaAutosize, {
  width: "100%",
  fontSize: "14px",
  resize: "none",
  paddingBlock: "1rem",
  padding: "1rem",
  borderRadius: "8px",
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
  padding: "1rem",
});

export const SectionParagraphRow = styled(Grid, {
  marginBottom: "1rem",
  backgroundColor: `${theme.colors.$primaryMain}08`,
  borderRadius: "8px",
  boxSizing: "border-box",
  border: `1px solid ${theme.colors.$primaryMain}`,
});

export const Paragraph = styled("p", {
  fontSize: "14px",
  padding: "1rem",
  overflowWrap: "break-word",
  textAlign: "justify",
  backgroundColor: `${theme.colors.$primaryMain}50`,
  margin: "0",
  borderRadius: "8px 0 0 8px",
  cursor: "pointer",
});
