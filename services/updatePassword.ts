import { getAuth, updatePassword as upPwd } from "firebase/auth";
import signInWithEmail from "./signInWithEmail";

export default function updatePassword(
  email: string,
  oldPassword: string,
  newPassword: string
) {
  const auth = getAuth();

  const { currentUser } = auth;
  if (currentUser)
    return signInWithEmail({ email, password: oldPassword }).then(() => {
      upPwd(currentUser, newPassword);
    });
}
