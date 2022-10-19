import { Container, Link } from "bookmarker-ui";
import resetPassword from "services/resetPassword";

export default function EmailSent({ email }: { email: string }) {
  const handleReset = () => {
    resetPassword(email);
  };
  return (
    <Container
      fullHeight
      justifyCenter
      alignCenter
      style={{ flexDirection: "column", marginBottom: 4 }}
    >
      <div>We have sent a password recovery instructions to your email</div>
      <div style={{ marginTop: 4 }}>
        Did not receive the link? <Link onClick={handleReset}>Resend</Link>
      </div>
      <div>
        <Link href="/">Go home</Link>
      </div>
    </Container>
  );
}
