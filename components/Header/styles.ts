import { styled } from "@stitches/react";
import { theme } from "../../config/theme";

export const Wrapper = styled("div", {
  background: `linear-gradient(135deg, ${theme.colors.$primaryMain}, ${theme.colors.$primaryLight})`,
  minHeight: "200px",
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const Content = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "0.5rem",
});
