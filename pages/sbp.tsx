import { Box } from "@mui/material";
import PaymentTab from "../components/PaymentTab";
import SbpUpload from "../components/SbpUpload";
import SbpForm from "../components/SbpForm";
import { useSelector } from "react-redux";
import { selectSbpData } from "../store/sbpData";

export default function Sbp() {
  const {
    sbpPaymentTabs: { certain_payments },
  } = useSelector(selectSbpData);

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
      {certain_payments && <PaymentTab />}
    </Box>
  );
}
