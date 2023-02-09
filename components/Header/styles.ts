import { styled } from "@stitches/react";

export const Wrapper = styled("div", {
  background: "linear-gradient(135deg, #dea27a, #fff7f2)",
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
