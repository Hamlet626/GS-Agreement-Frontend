import { Box, Tabs } from "@mui/material";
import { styled } from "@stitches/react";

export const Wrapper = styled(Box, {
  paddingTop: "2rem",
});

export const TabsWrapper = styled(Tabs, {
  variants: {
    sticked: {
      true: {
        position: "fixed",
        zIndex: 2,
        top: 0,
        right: 0,
        left: 0,
        backgroundColor: "#ffffff",
        margin: 0,
        padding: "1rem 0",
        boxShadow: "0 0 10px #0c273a50",
      },
    },
  },
});
