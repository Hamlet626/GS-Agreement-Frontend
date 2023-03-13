import { Box } from "@mui/material";
import PaymentTab from "../components/PaymentTab";
import SbpUpload from "../components/SbpUpload";
import SbpForm from "../components/SbpForm";

export default function Sbp() {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <SbpUpload />
      <SbpForm />
      <PaymentTab />
    </Box>
  );
}
