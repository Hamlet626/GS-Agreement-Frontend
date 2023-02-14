import React, { useRef } from "react";
import { DocumentText, DocumentTitle, DocumentWrapper } from "./styles";

interface SectionProps {
  title: string;
  text: string;
  index: number;
}

export default function Section({ title, text, index }: SectionProps) {
  const sectionRef = useRef(null);

  return (
    <DocumentWrapper key={title}>
      <DocumentTitle>
        <b id={index.toString()}>{title}</b>
      </DocumentTitle>
      <DocumentText ref={sectionRef} disabled value={text} />
    </DocumentWrapper>
  );
}
