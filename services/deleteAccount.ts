import { getAuth, deleteUser } from "firebase/auth";
import signInWithEmail from "./signInWithEmail";

export default async function deleteAccount(email: string, password: string) {
  return signInWithEmail({ email, password }).then((userCredential) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) deleteUser(user);
  });
}
