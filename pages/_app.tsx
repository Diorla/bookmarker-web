import UserProvider from "../context/userContext";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Head from "next/head";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background: #e4ebf5;
  }
`;

const theme = {
  primaryLight: "#4db6ac",
  primary: "#00796b",
  primaryDark: "#004d40",
  secondaryLight: "#f06292",
  secondary: "#e91e63",
  secondaryDark: "#c2185b",
  white: "#ffffff",
  greyLight1: "#e4ebf5",
  greyLight2: "#c8d0e7",
  greyLight3: "#bec8e4",
  greyDark: "#9baacf",
  black: "#000000",
  error: "#f44336",
};

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>Bookmarker</title>
          <link rel="shortcut icon" href="favicon.ico" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8409252119990664"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
      <GlobalStyle />
    </UserProvider>
  );
}
