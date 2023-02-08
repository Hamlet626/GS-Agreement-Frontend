import { Button, Grid, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import { useState } from "react";

export default function DocumentSummarizer() {
  const [htmlFromPdf, setHtmlFromPdf] = useState(null);

  const handleGetPdf = async (event: any) => {
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
        <div>
          <Button
            variant="contained"
            component="label"
            startIcon={<PictureAsPdfIcon />}
            color="info"
          >
            Upload PDF
            <input hidden accept="*" type="file" onChange={handleGetPdf} />
          </Button>
          <p>{htmlFromPdf}</p>
        </div>
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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
          vulputate mauris.
        </p>
        <p>
          Integer blandit, mauris sed scelerisque cursus, leo enim accumsan
          nulla, non sollicitudin metus massa non arcu.
        </p>
      </Grid>
    </Grid>
  );
}
