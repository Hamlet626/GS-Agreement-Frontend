import { styled } from "@stitches/react";

export const DraftEditorRoot = styled("div", {
  display: "flex",
  flexDirection: "column",
  border: `1px solid #0c273a50`,
  borderRadius: "8px",
  "& .rdw-editor-wrapper": {
    flexGrow: 1,
  },
  "& .rdw-editor-toolbar": {
    backgroundColor: "transparent",
    borderBottom: `1px solid #0c273a50`,
    borderLeft: "none",
    borderRight: "none",
    borderTop: "none",
    marginBottom: 0,
  },
  "& .rdw-option-wrapper": {
    backgroundColor: "transparent",
    border: "none",
  },
  "& .rdw-option-wrapper:hover": {
    backgroundColor: "#dea27a",
    boxShadow: "none",
  },
  "& .rdw-option-active": {
    backgroundColor: "#dea27a",
    boxShadow: "none",
  },
  "& .rdw-editor-main": {
    color: "#0c273a",
    padding: "2rem",
  },
  "& .public-DraftEditorPlaceholder-root": {
    color: "#0c273a",
  },
  "& .public-DraftStyleDefault-block": {
    margin: 0,
  },

  "& .rdw-block-wrapper, .rdw-fontsize-wrapper, .rdw-dropdown-wrapper, .rdw-text-align-wrapper, .rdw-fontfamily-wrapper, .rdw-list-wrapper, .rdw-colorpicker-wrapper, .rdw-link-wrapper, .rdw-embedded-wrapper, .rdw-emoji-wrapper, .rdw-image-wrapper, .rdw-remove-wrapper, .rdw-history-wrapper":
    {
      display: "none",
    },
});

export const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem 0",
});

export const ButtonWrapper = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  padding: "1rem",
});
