import { Button, Typography } from "@mui/material";
import { ButtonWrapper, DraftEditorRoot, Wrapper } from "./styles";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ISection, setSections } from "../../store/pdfDocument";
import { useRouter } from "next/router";

export default function DraftEditor() {
  const [editorBlocks, setEditorBlocks] = useState<any>();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleTransformBlocksInSections = () => {
    let sections: ISection[] = [];

    editorBlocks.forEach(({ text, inlineStyleRanges }: any) => {
      const isBold = inlineStyleRanges?.some(
        ({ style }: any) => style === "BOLD"
      );

      if (isBold) {
        sections.push({ title: text, text: "" });
      } else {
        sections.length > 0
          ? (sections[sections.length - 1].text = sections[
              sections.length - 1
            ]?.text.concat("", text))
          : sections.push({ title: text.slice(0, 16), text: text });
      }
    });

    dispatch(setSections(sections));
    router.push("/summarized");
  };

  return (
    <Wrapper>
      <Typography variant="h2" align="left">
        Write a Document
      </Typography>
      <DraftEditorRoot>
        <Editor
          onContentStateChange={({ blocks }) => setEditorBlocks(blocks)}
          toolbar={{
            inline: {
              options: ["bold"],
            },
          }}
        />
        <ButtonWrapper>
          <Button
            variant="contained"
            color="info"
            onClick={handleTransformBlocksInSections}
          >
            Send
          </Button>
        </ButtonWrapper>
      </DraftEditorRoot>
    </Wrapper>
  );
}
