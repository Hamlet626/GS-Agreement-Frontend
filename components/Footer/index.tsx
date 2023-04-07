import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import { useRouter } from "next/router";
import { theme } from "../../config/theme";

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "primary.light",
  backgroundColor: "primary.main",
  mr: 1,
  "&:hover": {
    bgcolor: "primary.dark",
  },
};

export default function AppFooter() {
  const router = useRouter();

  return (
    <Box
      component="footer"
      sx={{ boxShadow: theme.shadows.$mainShadow }}
    >
      <Container sx={{ my: 8, display: "flex" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Image
              src="/logo.png"
              width={80}
              height={80}
              alt="Logo"
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
            />
            <Grid item>
              <Typography sx={{ my: 2 }}>
                {"© "}
                <Link
                  color="inherit"
                  href="https://www.patriotconceptions.com/"
                  target="_blank"
                >
                  Patriot Conceptions
                </Link>{" "}
                {new Date().getFullYear()}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Social Media
            </Typography>
            <Grid item sx={{ display: "flex", my: 3 }}>
              <Box
                component="a"
                href="https://www.facebook.com/patriotconceptionsus/"
                target="_blank"
                sx={iconStyle}
              >
                <FacebookIcon />
              </Box>
              <Box
                component="a"
                href="https://www.instagram.com/patriotconceptions/"
                target="_blank"
                sx={iconStyle}
              >
                <InstagramIcon />
              </Box>
              <Box
                component="a"
                href="https://www.youtube.com/channel/UCAhZoLMEKXv04BzihB2EbPA"
                target="_blank"
                sx={iconStyle}
              >
                <YouTubeIcon />
              </Box>
              <Box
                component="a"
                href="https://twitter.com/PatriotConcept4"
                target="_blank"
                sx={iconStyle}
              >
                <TwitterIcon />
              </Box>
              <Box
                component="a"
                href="https://www.linkedin.com/company/patriot-conceptions/?trk=public_profile_topcard_current_company"
                target="_blank"
                sx={iconStyle}
              >
                <LinkedInIcon />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link color="secondary">Terms Of Service</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link
                  color="secondary"
                  href="https://www.patriotconceptions.com/privacy-notice"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
