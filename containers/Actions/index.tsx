import { Container } from "bookmarker-ui";
import { useEffect, useState } from "react";
import Switch from "./Switch";

export default function Actions() {
  /**
   * There are three possible modes
   * resetPassword, recoverEmail, verifyEmail
   * recovering Emails (recoverEmail) is not supported or needed yet
   */
  const [mode, setMode] = useState("");
  const [actionCode, setActionCode] = useState("");

  useEffect(() => {
    let params = new URL(location.href).searchParams;

    setMode(params.get("mode") || "");
    setActionCode(params.get("oobCode") || "");

    return () => {};
  }, []);

  return (
    <Container
      fullHeight
      alignCenter
      justifyCenter
      style={{ flexDirection: "column" }}
    >
      <Switch mode={mode} actionCode={actionCode} />
    </Container>
  );
}
