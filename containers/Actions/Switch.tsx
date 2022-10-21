import Invalid from "./Invalid";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";

export default function Switch({
  mode,
  actionCode,
}: {
  mode: string;
  actionCode: string;
}) {
  if (mode === "verifyEmail") return <VerifyEmail actionCode={actionCode} />;
  if (mode === "resetPassword")
    return <ResetPassword actionCode={actionCode} />;
  return <Invalid />;
}
