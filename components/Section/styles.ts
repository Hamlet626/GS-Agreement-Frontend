import { styled } from "@stitches/react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Grid } from "@mui/material";

export const SectionsWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "2.5rem",
});

export const DocumentTextArea = styled(TextareaAutosize, {
  width: "100%",
  fontSize: "16px",
  resize: "none",
  paddingBlock: "1rem",
  padding: "1rem",
  borderRadius: "8px",
  "&:focus, &:active": {
    borderColor: "#dea27a",
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
  backgroundColor: "#dea27a08",
  borderRadius: "8px",
  boxSizing: "border-box",
  border: "1px solid #dea27a",
});

export const Paragraph = styled("p", {
  fontSize: "14px",
  padding: "1rem",
  overflowWrap: "break-word",
  textAlign: "justify",
});
