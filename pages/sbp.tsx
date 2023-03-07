import { Box, Button, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Sbp() {
    
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: 'center' }}>
      <Typography variant="h2" align="center">
        Upload a Document
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<PictureAsPdfIcon />}
          color="info"
        >
          Upload SBP PDF
          <input
            hidden
            accept="application/pdf"
            type="file"
            // onChange={handleUploadPdf}
          />
        </Button>
      </Box>
        <Box sx={{ display: "flex", gap: "1rem", alignItems: 'center' }}>
          <Typography variant="h6">Transfer Date</Typography>
          <DatePicker />
        </Box>
    </Box>
  );
}
