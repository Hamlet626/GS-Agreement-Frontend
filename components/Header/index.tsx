import * as React from "react";
import { Container } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import { AppBar, Box, Toolbar } from "@mui/material";
import { Button, Navbar } from "./styles";
import { theme } from "../../config/theme";

export default function Header() {
  const router = useRouter();
  const navItems = [
    { text: "Contract", href: "/" },
    { text: "SBP", href: "/sbp" },
  ];

  return (
    <Box style={{  boxShadow: `0px 0px 0px 150px ${theme.colors.$primaryMain}` }}>
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
                  actived={
                    router.pathname === href ||
                    (router.pathname === "/summarized" && href === "/")
                  }
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
