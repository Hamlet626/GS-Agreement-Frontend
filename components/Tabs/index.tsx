import { Tabs as MaterialTabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import React from "react";
import { Typography } from "@mui/material";
import { Wrapper } from "./styles";

export default function Tabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Wrapper>
      <Typography variant="h2">Select a Section</Typography>
      <MaterialTabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
        sx={{ my: 2 }}
      >
        <Tab label="Section One" />
        <Tab label="Section Two" />
        <Tab label="Section Three" />
        <Tab label="Section Four" />
        <Tab label="Section Five" />
        <Tab label="Section Six" />
        <Tab label="Section Seven" />
      </MaterialTabs>
    </Wrapper>
  );
}
