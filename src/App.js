import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap-reboot.css";

import { useUser } from "./context/userContext";
import UnauthenticatedApp from "./unauthenticated-app";
import AuthenticatedApp from "./authenticated-app";

function App() {
  const { user } = useUser();

  console.log("render APP, session is ");
  console.log(user);

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
