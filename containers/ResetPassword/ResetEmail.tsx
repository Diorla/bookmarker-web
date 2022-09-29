import { useState } from "react";
import Button from "../../components/button";
import Center from "../../components/Center";
import Input from "../../components/input";
import resetPassword from "../../services/resetPassword";

export default function ResetEmail({
  confirmEmail,
}: {
  confirmEmail: (str: string) => void;
}) {
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const handleReset = () => {
    if (email) resetPassword(email).then(() => confirmEmail(email));
    else setError("Please provide an email");
  };
  return (
    <Center style={{ flexDirection: "column" }}>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorText={error}
        onFocus={() => setError("")}
        type="email"
        placeholder="example@email.com"
      />
      <Button onClick={handleReset} style={{ marginTop: 8 }} variant="primary">
        Send Instruction
      </Button>
    </Center>
  );
}
