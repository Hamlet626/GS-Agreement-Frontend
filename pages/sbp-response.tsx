import { Box, Button, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";
import { IField, selectSbpFields } from "../store/sbpFields";
import dayjs from "dayjs";

export default function Sbp() {
  const sbpFields = useSelector(selectSbpFields);
  console.log(sbpFields);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" align="center">
        SBP Report
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<PictureAsPdfIcon />}
          color="info"
        >
          Change SBP PDF
          <input
            hidden
            accept="application/pdf"
            type="file"
            // onChange={handleUploadPdf}
          />
        </Button>
      </Box>
      <Box sx={{ my: 6, display: 'flex', flexDirection: 'column', gap: '2rem'}}>

      {sbpFields?.map(({ id, label, value }: IField) => (
        <Box
        key={id}
        sx={{  display: "flex", gap: "1rem", alignItems: "center", justifyContent: 'space-between' }}
        >
          <Typography variant="h6">{label}</Typography>
          <DatePicker defaultValue={dayjs(value)} />
        </Box>
      ))}
      </Box>
    </Box>
  );
}
