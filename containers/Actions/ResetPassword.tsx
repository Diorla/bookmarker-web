import { useState } from "react";
import Button from "../../components/button";
import Center from "../../components/Center";
import Input from "../../components/input";
import verifyPassword from "../../services/verifyPassword";

export default function ResetPassword({ actionCode }: { actionCode: string }) {
  const [isReset, setIsReset] = useState(false);
  const initialPassword = { init: "", confirm: "" };
  const [password, setPassword] = useState(initialPassword);
  const [error, setError] = useState(initialPassword);

  const submitNewPassword = () => {
    const { init, confirm } = password;

    if (!init)
      setError({ ...initialPassword, init: "Please provide a new password" });
    else if (!confirm)
      setError({
        ...initialPassword,
        confirm: "Please confirm your password",
      });
    else if (confirm !== init)
      setError({
        ...initialPassword,
        confirm: "Password does not match",
      });
    else
      verifyPassword(
        password.init,
        actionCode,
        () => setIsReset(true),
        (err) =>
          setError({
            ...initialPassword,
            confirm: err.message,
          })
      );
  };
  if (isReset)
    return (
      <Center>
        <h2>Password Reset</h2>
        <div>Your password has been reset</div>
      </Center>
    );
  return (
    <Center>
      <h2>Password Reset</h2>
      <Input
        id="password"
        label="New password"
        type="password"
        placeholder="********"
        value={password.init}
        onChange={(e) => setPassword({ ...password, init: e.target.value })}
        errorText={error.init}
      />
      <Input
        id="password"
        label="Confirm password"
        type="password"
        placeholder="********"
        value={password.confirm}
        onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
        errorText={error.confirm}
      />
      <Button variant="primary" onClick={submitNewPassword}>
        Reset Password
      </Button>
    </Center>
  );
}
