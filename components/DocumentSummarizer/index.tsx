import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectSection } from "../../store/pdfDocument";
import Section from "../Section";
import { Transcription } from "./styles";
import { useRef } from "react";

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
            pdfSections.map(({ title, text }, index) => (
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
        <Box sx={{ my: 3, position: "relative" }}>
          {pdfSections?.length > 0 &&
            pdfSections.map(({ transcriptions }) =>
              transcriptions.map(({ text, yPosition }, index) => (
                <Transcription
                  key={index}
                  css={{ "--top-position": `${Number(yPosition) - 490}px` }}
                >
                  {text}
                </Transcription>
              ))
            )}
        </Box>
      </Grid>
    </Grid>
  );
}
