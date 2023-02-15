import { Container } from "@mui/material";
import DocumentSummarizer from "../components/DocumentSummarizer";
import TextInfo from "../components/TextInfo";
import DocumentTabs from "../components/DocumentTabs";
import { useSelector } from "react-redux";
import { selectSection } from "../store/pdfDocument";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Summarized() {
  const router = useRouter();

  const pdfSections = useSelector(selectSection);

  useEffect(() => {
    !pdfSections && router.push("/");
  }, [pdfSections, router]);

  return (
    <Container sx={{ my: 3 }}>
      <TextInfo
        text="This document summary is not legal advice or legally binding in any
        way. You should consult a lawyer."
        type="warning"
      />
      <DocumentTabs />
      <DocumentSummarizer />
    </Container>
  );
}
