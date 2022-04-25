import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap-reboot.css";

import { useUser } from "./context/userContext";
import UnauthenticatedApp from "./unauthenticated-app";
import AuthenticatedApp from "./authenticated-app";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const { user } = useUser();
  const client = new QueryClient();

  console.log("render APP, session is ");
  console.log(user);

  return user ? (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <AuthenticatedApp />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  ) : (
    <UnauthenticatedApp />
  );
}

export default App;
