import { useState, useEffect, createContext, useContext } from "react";
import { createFirebaseApp } from "../firebase/clientApp";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface UserProps {
  user: User;
  loadingUser: boolean;
  error: Error;
}

export const UserContext = createContext<UserProps>({
  user: null,
  loadingUser: true,
  error: null,
});

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const app = createFirebaseApp();
    const auth = getAuth(app);
    const unsubscriber = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
        } else setUser(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoadingUser(false);
      }
    });

    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, loadingUser, error }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
