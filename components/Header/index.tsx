import * as React from "react";
import { Container } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
} from "@mui/material";
import { Navbar } from "./styles";

export default function Header() {
  const router = useRouter();
  const navItems = [{ text: 'Contract', href: '/'}, { text: 'SBP', href: '/sbp'}]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Image
              src="/logo.png"
              width={55}
              height={55}
              alt="Logo"
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
            />
            <Navbar>
              {navItems.map(({ text, href }) => (
                <Button color="secondary" variant="text" key={href} onClick={() => router.push(href)}>{text}</Button>
            
              ))}
            </Navbar>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
