import { Card, CardContent, Typography } from "@mui/material";
import DocumentUpload from "../components/DocumentUpload";
import DraftEditor from "../components/DraftEditor";

export default function Home() {
  return (
      ///this is surface container 2, for which we could use elevation 12-15.9, see note1
    <Card elevation={12}>
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
