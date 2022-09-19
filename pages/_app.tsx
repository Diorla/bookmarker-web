import UserProvider from "../context/userContext";
import { createGlobalStyle } from "styled-components";
import Head from "next/head";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background-color: aliceblue;
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
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Bookmarker</title>
        <link rel="shortcut icon" href="favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <GlobalStyle />
    </UserProvider>
  );
}
