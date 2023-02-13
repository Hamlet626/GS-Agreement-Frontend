import { Grid, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { OriginalDocument } from "./styles";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectPdfDocumennt } from "../../store/pdfDocument";
import { useRouter } from "next/router";

export default function DocumentSummarizer() {
  const pdfDocument = useSelector(selectPdfDocumennt);
  const originalDocumentRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    !pdfDocument && router.push("/");
  }, [pdfDocument, router]);

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
          {pdfDocument && (
            <OriginalDocument
              ref={originalDocumentRef}
              dangerouslySetInnerHTML={{ __html: pdfDocument }}
            />
          )}
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
