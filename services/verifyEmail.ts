import { getAuth, applyActionCode } from "firebase/auth";
import { createFirebaseApp } from "../firebase/clientApp";

export default function verifyPassword(actionCode: string) {
  const app = createFirebaseApp();
  const auth = getAuth(app);

  return applyActionCode(auth, actionCode);
}
