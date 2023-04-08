import { Card, CardContent, Typography } from "@mui/material";
import DocumentUpload from "../components/DocumentUpload";
import DraftEditor from "../components/DraftEditor";

export default function Home() {
  return (
    <Card elevation={3}>
      <CardContent>
        <DocumentUpload />
        <Typography
          variant="h5"
          align="center"
          sx={{
            margin: "2rem 0",
          }}
        >
          Or
        </Typography>
        <DraftEditor />
      </CardContent>
    </Card>
  );
}
