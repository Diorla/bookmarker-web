import { Link, Input, Button } from "bookmarker-ui";
import { useState } from "react";
import verifyPassword from "services/verifyPassword";

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
      <>
        <h2>Password Reset</h2>
        <div>Your password has been reset</div>
        <Link href="/">Go home</Link>
      </>
    );
  return (
    <>
      <h2>Password Reset</h2>
      <Input
        id="password"
        label="New password"
        type="password"
        placeholder="********"
        value={password.init}
        onChange={(e) => setPassword({ ...password, init: e.target.value })}
        errorText={error.init}
        onFocus={() => setError(initialPassword)}
      />
      <Input
        id="password"
        label="Confirm password"
        type="password"
        placeholder="********"
        value={password.confirm}
        onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
        errorText={error.confirm}
        onFocus={() => setError(initialPassword)}
      />
      <Button
        variant="primary"
        onClick={submitNewPassword}
        style={{ marginTop: 8 }}
      >
        Reset Password
      </Button>
    </>
  );
}
