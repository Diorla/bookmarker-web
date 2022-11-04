import UserProvider from "context/userContext";
import { createGlobalStyle } from "styled-components";
import Head from "next/head";
import { ThemeProvider } from "bookmarker-ui";
import Script from "next/script";

const GlobalStyle = createGlobalStyle`
  :root {
    scroll-behavior: smooth;
  }
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

          <meta name="application-name" content="Bookmarker" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Bookmarker" />
          <meta
            name="description"
            content="For sharing bookmarks across multiple browsers"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#008080" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/touch-icon-ipad.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/touch-icon-ipad-retina.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#008080"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />

          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:url"
            content="https://bookmarker-one.vercel.app/"
          />
          <meta name="twitter:title" content="Bookmarker" />
          <meta
            name="twitter:description"
            content="Best Bookmarker in the world"
          />
          <meta
            name="twitter:image"
            content="https://bookmarker-one.vercel.app/icons/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@dihorla" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Bookmarker" />
          <meta
            property="og:description"
            content="For sharing bookmarks across multiple browsers"
          />
          <meta property="og:site_name" content="Bookmarker" />
          <meta
            property="og:url"
            content="https://bookmarker-one.vercel.app/"
          />
          <meta
            property="og:image"
            content="https://bookmarker-one.vercel.app/icons/apple-touch-icon.png"
          />

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
