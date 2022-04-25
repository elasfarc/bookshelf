import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [session, setSession] = React.useState({
    user: null,
    isLoading: true,
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession({ user, isLoading: false });
    });
    return () => unsubscribe();
  }, []);

  return session.isLoading ? null : (
    <UserContext.Provider value={session} children={children} />
  );
}

function useUser() {
  const session = React.useContext(UserContext);
  if (!session) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return session;
}

export { UserProvider, useUser };
