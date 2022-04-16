import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [session, setSession] = React.useState({
    user: null,
    isLoading: true,
  });

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setSession({ user, isLoading: false });
    });
    return () => unsubscribe();
  }, []);

  return session.isLoading ? null : (
    <UserContext.Provider value={session} children={children} />
  );
}

function useUser() {
  const user = React.useContext(UserContext);
  if (!user) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return user;
}

export { UserProvider, useUser };
