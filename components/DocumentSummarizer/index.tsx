import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSection } from "../../store/pdfDocument";
import Section from "../Section";
import { SectionsListWrapper } from "./styles";

export default function DocumentSummarizer() {
  const pdfSections = useSelector(selectSection);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
        <SectionsListWrapper>
          {pdfSections?.length > 0 &&
            pdfSections.map(({ title, text }, index) => (
              <Section key={title} title={title} text={text} index={index} />
            ))}
        </SectionsListWrapper>
      </Grid>
    </Grid>
  );
}
