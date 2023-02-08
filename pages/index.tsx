import { Warning as WarningIcon } from "@mui/icons-material";
import { Container } from "@mui/system";
import { Warning } from "../components/Home/styles";
import Faq from "../components/Faq";
import DocumentSummarizer from "../components/DocumentSummarizer";

export default function Home() {
  return (
    <>
      <Container sx={{ my: 3 }}>
        <Warning>
          <WarningIcon />
          This document summary is not legal advice or legally binding in any
          way. You should consult a lawyer.
        </Warning>
        <DocumentSummarizer />
        <Faq />
      </Container>
    </>
  );
}
