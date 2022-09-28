import { getAuth, updateProfile } from "firebase/auth";

export default function updateDisplayName(displayName: string) {
  const auth = getAuth();
  const { currentUser } = auth;
  if (currentUser) return updateProfile(currentUser, { displayName });
  return null;
}
