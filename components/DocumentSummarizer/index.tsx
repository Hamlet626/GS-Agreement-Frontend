import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectSection } from "../../store/pdfDocument";
import Section from "../Section";

export default function DocumentSummarizer() {
  const pdfSections = useSelector(selectSection);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={6}>
        <Typography
          variant="h6"
          sx={{
            py: 2,
            borderBottom: "1px solid #3f3f33",
            fontWeight: "bolder",
          }}
        >
          Original Document
        </Typography>
        <Box sx={{ my: 3 }}>
          {pdfSections?.length > 0 &&
            pdfSections.map(({ section: { title, text } }, index) => (
              <Section key={title} title={title} text={text} index={index} />
            ))}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography
          variant="h6"
          sx={{
            py: 2,
            borderBottom: "1px solid #3f3f33",
            fontWeight: "bolder",
          }}
        >
          Summarized Doc
        </Typography>
        <Box sx={{ my: 3 }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
            vulputate mauris.
          </p>
          <p>
            Integer blandit, mauris sed scelerisque cursus, leo enim accumsan
            nulla, non sollicitudin metus massa non arcu.
          </p>
        </Box>
      </Grid>
    </Grid>
  );
}
