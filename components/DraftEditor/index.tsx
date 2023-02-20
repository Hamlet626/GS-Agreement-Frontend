import { Button, Typography } from "@mui/material";
import { ButtonWrapper, DraftEditorRoot, Wrapper } from "./styles";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";

export default function DraftEditor() {
  const [editorBlocks, setEditorBlocks] = useState<any>();
  console.log(editorBlocks);
  return (
    <Wrapper>
      <Typography variant="h2" align="center">
        Write a Document
      </Typography>
      <DraftEditorRoot>
        <Editor
          onChange={({ blocks }) => setEditorBlocks(blocks)}
          toolbar={{
            inline: {
              options: ["bold"],
            },
          }}
        />
        <ButtonWrapper>
          <Button variant="contained" color="info">
            Send
          </Button>
        </ButtonWrapper>
      </DraftEditorRoot>
    </Wrapper>
  );
}
