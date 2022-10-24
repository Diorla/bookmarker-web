import { getAuth, sendEmailVerification } from "firebase/auth";

export default function sendVerification() {
  const auth = getAuth();
  if (auth.currentUser) return sendEmailVerification(auth.currentUser);
}
