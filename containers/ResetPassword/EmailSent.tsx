import Center from "../../components/Center";
import Link from "../../components/link";
import resetPassword from "../../services/resetPassword";

export default function EmailSent({ email }: { email: string }) {
  const handleReset = () => {
    resetPassword(email);
  };
  return (
    <Center style={{ flexDirection: "column", marginBottom: 4 }}>
      <div>We have sent a password recovery instructions to your email</div>
      <div style={{ marginTop: 4 }}>
        Did not receive the link? <Link onClick={handleReset}>Resend</Link>
      </div>
      <div>
        <Link href="/">Go home</Link>
      </div>
    </Center>
  );
}
