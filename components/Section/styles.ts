import { styled } from "@stitches/react";
import TextareaAutosize from "@mui/base/TextareaAutosize";

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

export const DocumentTitle = styled("strong", {});

export const SectionHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  justifyContent: "space-between",
  padding: "0.5rem 0",
});

export const Transcription = styled("div", {
  display: "flex",
  flexDirection: "column",
  fontSize: "14px",
  padding: "1rem 0",
});
