import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap-reboot.css";

import { useUser } from "./context/userContext";
import UnauthenticatedApp from "./unauthenticated-app";
import AuthenticatedApp from "./authenticated-app";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "./util/react-query/query-client";

function App() {
  const { user } = useUser();

  console.log("render APP, session is ");
  console.log(user);

  return user ? (
    <QueryClientProvider client={queryClient}>
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
