import { Box, Tabs } from "@mui/material";
import { styled } from "@stitches/react";
import { theme } from "../../config/theme";


export const TabsWrapper = styled(Tabs, {
  variants: {
    sticked: {
      true: {
        position: "fixed",
        zIndex: 2,
        top: 0,
        right: 0,
        left: 0,
        margin: 0,
        padding: "1rem 0",
        boxShadow: `0 0 10px ${theme.colors.$secondaryMain}50`,
      },
    },
  },
});
