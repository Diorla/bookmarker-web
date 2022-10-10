import { Container } from "bookmarker-ui";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Form() {
  const [isNew, setIsNew] = useState(false);
  return (
    <Container fullHeight alignCenter justifyCenter>
      {isNew ? (
        <SignUp toggleForm={() => setIsNew(!isNew)} />
      ) : (
        <SignIn toggleForm={() => setIsNew(!isNew)} />
      )}
    </Container>
  );
}
