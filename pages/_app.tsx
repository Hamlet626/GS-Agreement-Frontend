import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider as MaterialThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../config/createEmotionCache";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { materialTheme } from "../config/theme";
import { Box, Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <ReduxProvider store={store}>
      <CacheProvider value={emotionCache}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Head>
            <title>Patriot Conceptions</title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <MaterialThemeProvider theme={materialTheme}>
            <CssBaseline />
            <Loader />
            <Modal />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Header />
              <Container sx={{ my: 3, flexGrow: 1 }}>
                <Component {...pageProps} />
              </Container>
              <Footer />
            </Box>
          </MaterialThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </ReduxProvider>
  );
}
