// @ts-nocheck
import {Button, Grid, Tooltip} from "@mui/material";
import Tab from "@mui/material/Tab";
import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { TabsWrapper, Wrapper } from "./styles";
import {useDispatch, useSelector} from "react-redux";
import { selectSection } from "../../store/pdfDocument";
import {removeSave, selectSaveCallback} from "../../store/saveButton";

export default function DocumentTabs() {
  const [value, setValue] = React.useState(0);
  const [stickyOnHeader, setStickyOnHeader] = useState(false);
  const documentSections = useSelector(selectSection);
  const saveCallback = useSelector(selectSaveCallback);
  const tabRef = useRef(null);
  const dispatch = useDispatch();

  const clickSave = () => {
    saveCallback();
    dispatch(removeSave());
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    window.location.href = `#${newValue}`;
    window.scrollBy(0, -120);
  };

  const triggerStickOnHeader = () => {
    if (
      window.scrollY >=
      tabRef?.current?.offsetTop + tabRef?.current?.clientHeight
    ) {
      setStickyOnHeader(true);
    } else {
      setStickyOnHeader(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", triggerStickOnHeader);

    return () => {
      document.removeEventListener("scroll", triggerStickOnHeader);
    };
  }, []);

  const tabs=<TabsWrapper
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      value={value}
      onChange={handleChangeTab}
      sx={{ my: 2 }}
      sticked={stickyOnHeader}
  >
    {documentSections.map(({ title }, index) => (
        <Tooltip title={title} key={index}>
          <Tab
              label={
                title?.length >= 15 ? `${title.trim().slice(0, 15)}...` : title
              }
          />
        </Tooltip>
    ))}
  </TabsWrapper>;


  ///todo: 1 make save button forever in a row with the tabs, stick or not
  ///      2 change save button UI to square contained button fitting entire row
  return (
    <Wrapper ref={tabRef}>
      <Typography variant="h2">Select a Section</Typography>

      {saveCallback? <Grid direction={"row"}>
        {tabs}
        <Button variant={"contained"} color={"info"} onClick={clickSave}>
        </Button>
      </Grid>:tabs}
    </Wrapper>
  );
}
