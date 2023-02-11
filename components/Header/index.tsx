import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Content, Wrapper } from "./styles";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <Wrapper>
      <Container>
        <Content>
          <Image
            src="/logo.png"
            width={70}
            height={70}
            alt="Logo"
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          />
          <Typography
            variant="h5"
            component="h1"
            color="secondary"
            fontWeight={700}
            textAlign="center"
          >
            Patriot Conceptions
          </Typography>
        </Content>
      </Container>
    </Wrapper>
  );
}
