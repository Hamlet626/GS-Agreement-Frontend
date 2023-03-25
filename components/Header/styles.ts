import { styled } from "@stitches/react";
import { Button as MaterialButton } from "@mui/material";
import { theme } from "../../config/theme";

export const Navbar = styled("div", {
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

export const Button = styled(MaterialButton, {
  borderRadius: 0,
  borderBottom: "3px solid transparent",
  variants: {
    actived: {
      true: {
        borderBottom: `3px solid ${theme.colors.$primaryLight}`,
        fontWeight: "bolder",
        color: theme.colors.$primaryLight,
      },
    },
  },
});
