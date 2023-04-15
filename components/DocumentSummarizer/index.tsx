import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSection } from "../../store/docSections";
import Section from "../Section";
import { SectionsListWrapper } from "./styles";

export default function DocumentSummarizer() {
  const sections = useSelector(selectSection);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
        <SectionsListWrapper>
          {sections?.length > 0 &&
            sections.map(({ title, text }, index) => (
              <Section key={title} title={title} text={text} index={index} />
            ))}
        </SectionsListWrapper>
      </Grid>
    </Grid>
  );
}
