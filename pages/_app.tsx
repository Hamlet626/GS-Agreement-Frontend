import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <ReduxProvider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Patriot Conceptions</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Loader />
          <Modal />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </CacheProvider>
    </ReduxProvider>
  );
}
