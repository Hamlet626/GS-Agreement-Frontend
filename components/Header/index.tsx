import * as React from "react";
import { Container } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Navbar } from "./styles";
import { theme } from "../../config/theme";

export default function Header() {
  const router = useRouter();
  const navItems = [
    { text: "Contract", href: "/" },
    { text: "SBP", href: "/sbp-upload" },
  ];

  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="Logo"
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
            />
            <Navbar>
              {navItems.map(({ text, href }) => (
                <Button
                  sx={{ color: theme.colors.$white }}
                  variant="text"
                  key={href}
                  onClick={() => router.push(href)}
                >
                  {text}
                </Button>
              ))}
            </Navbar>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
