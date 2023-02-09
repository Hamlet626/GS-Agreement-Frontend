import DocumentSummarizer from "../components/DocumentSummarizer";
import TextInfo from "../components/TextInfo";

export default function Summarized() {
  return (
    <>
      <TextInfo
        text="This document summary is not legal advice or legally binding in any
        way. You should consult a lawyer."
        type="warning"
      />
      <DocumentSummarizer />
    </>
  );
}
