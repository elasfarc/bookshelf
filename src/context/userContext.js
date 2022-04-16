import React from "react";
import firebase from "firebase/compat/app";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [{ user, isLoading }, setSession] = React.useState({
    user: null,
    isLoading: true,
  });

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setSession({ user, isLoading: false });
    });
    return () => unsubscribe();
  }, []);

  return isLoading ? null : <UserContext.Provider value={user} {...children} />;
}

function useUser() {
  const user = React.useContext(UserContext);
  if (!user) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return user;
}

export { UserProvider, useUser };
