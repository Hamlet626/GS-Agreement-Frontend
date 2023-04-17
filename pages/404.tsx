import { Button, Card, CardContent } from "@mui/material";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <Card elevation={2}>
      <CardContent>
      <h2>404 - Page Not Found</h2>
      <Button variant="contained" onClick={() => router.push("/")}>
        Go home
      </Button>
      </CardContent>
    </Card>
  );
}
