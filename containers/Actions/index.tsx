import { useEffect, useState } from "react";
import Center from "../../components/Center";
import Invalid from "./Invalid";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";

const Switch = ({ mode, actionCode }: { mode: string; actionCode: string }) => {
  if (mode === "verifyEmail") return <VerifyEmail />;
  if (mode === "resetPassword")
    return <ResetPassword actionCode={actionCode} />;
  return <Invalid />;
};

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
    <Center style={{ flexDirection: "column" }}>
      <Switch mode={mode} actionCode={actionCode} />
    </Center>
  );
}
