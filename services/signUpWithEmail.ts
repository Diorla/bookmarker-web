import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export default function signUpWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password).then(() => {
    const auth = getAuth();
    if (auth.currentUser) sendEmailVerification(auth.currentUser);
  });
}
