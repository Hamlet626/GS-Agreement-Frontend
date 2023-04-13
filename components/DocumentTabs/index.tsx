// @ts-nocheck
import { Card, CardContent, Tooltip } from "@mui/material";
import Tab from "@mui/material/Tab";
import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { TabsWrapper } from "./styles";
import {  useSelector } from "react-redux";
import { selectDocumentTitle, selectSection } from "../../store/pdfDocument";

export default function DocumentTabs() {
  const [value, setValue] = React.useState(0);
  const [stickyOnHeader, setStickyOnHeader] = useState(false);
  const documentSections = useSelector(selectSection);

  const documentTitle = useSelector(selectDocumentTitle);

  const tabRef = useRef(null);

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

  const tabs = (
    <TabsWrapper
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
    </TabsWrapper>
  );

  return (
    <Card ref={tabRef} sx={{ marginTop: '1rem' }} elevation={2}>
      <CardContent>
      <Typography variant="h2" align="center">{documentTitle || 'Document Sections'}</Typography>
      {tabs}
      </CardContent>
    </Card>
  );
}
