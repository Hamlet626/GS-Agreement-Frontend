// @ts-nocheck
import { Tooltip } from "@mui/material";
import Tab from "@mui/material/Tab";
import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { TabsWrapper, Wrapper } from "./styles";
import { useSelector } from "react-redux";
import { selectPdfTitles } from "../../store/pdfDocument";

export default function DocumentTabs() {
  const [value, setValue] = React.useState(0);
  const [stickyOnHeader, setStickyOnHeader] = useState(false);
  const pdfTitles = useSelector(selectPdfTitles);
  const tabRef = useRef(null);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(pdfTitles[newValue]);
  };

  // const findAndScrollToText = (text: string) => {
  //   const searchText = new RegExp(text, "gi");
  //   const matches = Array.from(document.body.innerText.matchAll(searchText));
  //   if (matches.length > 0 && document.body.childNodes[0]) {
  //     const { x, y } =
  //       matches[0].index > 0
  //         ? document.body.childNodes[0]?.splitText(matches[0].index)
  //         : { x: 0, y: 0 };
  //     window.scrollTo({ top: y, left: x, behavior: "smooth" });
  //   }
  // };

  const triggerStickOnHeader = () => {
    if (
      window.scrollY >=
      tabRef.current.offsetTop + tabRef.current.clientHeight
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

  console.log(stickyOnHeader);

  return (
    <Wrapper ref={tabRef}>
      <Typography variant="h2">Select a Section</Typography>

      <TabsWrapper
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        value={value}
        onChange={handleChangeTab}
        sx={{ my: 2 }}
        sticked={stickyOnHeader}
      >
        {pdfTitles.map((title, index) => (
          <Tooltip title={title} key={index}>
            <Tab
              label={
                title.length >= 15 ? `${title.trim().slice(0, 15)}...` : title
              }
            />
          </Tooltip>
        ))}
      </TabsWrapper>
    </Wrapper>
  );
}
