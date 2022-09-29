import { useState } from "react";
import Center from "../../components/Center";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Form() {
  const [isNew, setIsNew] = useState(false);
  return (
    <Center>
      {isNew ? (
        <SignUp toggleForm={() => setIsNew(!isNew)} />
      ) : (
        <SignIn toggleForm={() => setIsNew(!isNew)} />
      )}
    </Center>
  );
}
