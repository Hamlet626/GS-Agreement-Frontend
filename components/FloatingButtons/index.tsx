import { Wrapper } from "./styles";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function FloatingButtons() {
  const router = useRouter();

    return (
        <Wrapper>
            <Button variant="contained" color="secondary" onClick={() => router.push('/chat')}>
                Inquire Chatbot
            </Button>
        </Wrapper>
    )
}