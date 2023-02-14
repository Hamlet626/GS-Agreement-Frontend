import { TextareaAutosize } from "@mui/material";
import { styled } from "@stitches/react";

export const DocumentText = styled(TextareaAutosize, {
  width: "100%",
  padding: "0",
  border: "none",
  backgroundColor: "transparent",
  fontSize: "14px",
  resize: "none",
});

export const DocumentWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  fontSize: "14px",
  padding: "1rem 0",
});

export const DocumentTitle = styled("strong", {});
