import { Container } from "@mui/system";
import DocumentUpload from "../components/DocumentUpload";
import DraftEditor from "../components/DraftEditor";

export default function Home() {
  return (
    <>
      <Container sx={{ my: 3 }}>
        <DraftEditor />
        <DocumentUpload />
      </Container>
    </>
  );
}
