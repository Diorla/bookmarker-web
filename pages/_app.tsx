import UserProvider from "../context/userContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background-color: aliceblue;
  }
`;
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <GlobalStyle />;
    </UserProvider>
  );
}
