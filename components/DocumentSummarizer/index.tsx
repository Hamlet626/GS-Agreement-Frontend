import { Button, Grid, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import { useRef, useState } from "react";
import { OriginalDocument } from "./styles";
import { Box } from "@mui/system";

export default function DocumentSummarizer() {
  const [htmlFromPdf, setHtmlFromPdf] = useState();
  const originalDocumentRef = useRef(null);

  const handleUploadPdf = async (event: any) => {
    const pdfFile = event.target.files[0];

    const formData = new FormData();
    formData.append("pdfFile", pdfFile);

    const {
      data: { text },
    } = await axios.post("/api/extract-html-from-pdf", formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    setHtmlFromPdf(text);
  };

  const handleSelectText = (event: any) => {
    console.log(event);
    console.log(document.getSelection()?.toString());
  };

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
          {!htmlFromPdf ? (
            <Button
              variant="contained"
              component="label"
              startIcon={<PictureAsPdfIcon />}
              color="info"
            >
              Upload PDF
              <input hidden accept="*" type="file" onChange={handleUploadPdf} />
            </Button>
          ) : (
            <div onMouseUp={handleSelectText}>
              <OriginalDocument
                ref={originalDocumentRef}
                disabled
                value={htmlFromPdf}
              />
            </div>
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
