import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Content, Wrapper } from "./styles";
import Image from "next/image";

export default function Header() {
  return (
    <Wrapper>
      <Container>
        <Content>
          <Image src="/logo.png" width={80} height={80} alt="Logo" />
          <Typography
            variant="h4"
            component="h1"
            color="secondary"
            textAlign="center"
          >
            Patriot Conceptions
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            color="secondary"
            textAlign="center"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Content>
      </Container>
    </Wrapper>
  );
}
