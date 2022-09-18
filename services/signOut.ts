import { getAuth } from "firebase/auth";
import { createFirebaseApp } from "../firebase/clientApp";

const signOut = () => {
  const app = createFirebaseApp();
  const auth = getAuth(app);
  return auth.signOut();
};

export default signOut;
