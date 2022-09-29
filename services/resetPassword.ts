import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function resetPassword(email: string) {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
}
