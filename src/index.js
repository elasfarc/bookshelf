import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/userContext";
import "./firebase/config.js";
import { ErrorBoundary as TopErrorBoundary } from "react-error-boundary";
import ErrorScreen from "./pages/error/error";

ReactDOM.render(
  <React.StrictMode>
    <TopErrorBoundary
      FallbackComponent={(error) => (
        <ErrorScreen error={error} topErrorLevel={true} />
      )}
    >
      <UserProvider>
        <App />
      </UserProvider>
    </TopErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
