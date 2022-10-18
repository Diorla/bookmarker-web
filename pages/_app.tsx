import UserProvider from "../context/userContext";
import { createGlobalStyle } from "styled-components";
import Head from "next/head";
import { ThemeProvider } from "bookmarker-ui";
import Script from "next/script";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background: #e4ebf5;
  }
`;

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <UserProvider>
      <ThemeProvider>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>Bookmarker</title>
          <link rel="shortcut icon" href="favicon.ico" />
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8409252119990664"
            crossOrigin="anonymous"
          ></Script>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
      <GlobalStyle />
    </UserProvider>
  );
}
