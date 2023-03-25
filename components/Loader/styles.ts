import { styled } from "@stitches/react";
import { theme } from "../../config/theme";

export const LoaderWrapper = styled("div", {
  width: "100vw",
  height: "100vh",
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: `${theme.colors.$white}80`,
  inset: 0,
  zIndex: 2,
});
