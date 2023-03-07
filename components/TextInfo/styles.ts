import { styled } from "@stitches/react";
import { theme } from "../../config/theme";

export const Warning = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  padding: "0.5rem",
  border: `1px solid ${theme.colors.$warning}80`,
  color: `${theme.colors.$warning}80`,
});
