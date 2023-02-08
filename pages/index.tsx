import { Container } from "@mui/system";
import Faq from "../components/Faq";
import DocumentSummarizer from "../components/DocumentSummarizer";
import TextInfo from "../components/TextInfo";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Container sx={{ my: 3 }}>
        <TextInfo
          text="This document summary is not legal advice or legally binding in any
        way. You should consult a lawyer."
          type="warning"
        />
        <DocumentSummarizer />
        <Faq />
        <Contact />
      </Container>
    </>
  );
}
