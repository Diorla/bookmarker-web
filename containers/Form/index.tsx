import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Form() {
  const [isNew, setIsNew] = useState(false);
  return isNew ? (
    <SignUp toggleForm={() => setIsNew(!isNew)} />
  ) : (
    <SignIn toggleForm={() => setIsNew(!isNew)} />
  );
}
