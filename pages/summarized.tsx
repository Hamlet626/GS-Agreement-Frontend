import { Container } from "@mui/material";
import DocumentSummarizer from "../components/DocumentSummarizer";
import TextInfo from "../components/TextInfo";
import Tabs from "../components/Tabs";

export default function Summarized() {
  return (
    <Container sx={{ my: 3 }}>
      <TextInfo
        text="This document summary is not legal advice or legally binding in any
        way. You should consult a lawyer."
        type="warning"
      />
      <Tabs />
      <DocumentSummarizer />
    </Container>
  );
}
