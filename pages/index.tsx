import { Container } from "@mui/system";
import DocumentUpload from "../components/DocumentUpload";

export default function Home() {
  return (
    <>
      <Container sx={{ my: 3 }}>
        <DocumentUpload />
      </Container>
    </>
  );
}
