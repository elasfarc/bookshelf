import { ErrorBoundary as TopErrorBoundary } from "react-error-boundary";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, LightTheme } from "baseui";
import { Client as Styletron } from "styletron-engine-atomic";
import { ToasterContainer, PLACEMENT } from "baseui/toast";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./context/userContext";
import queryClient from "./util/react-query/query-client";
import ErrorScreen from "./pages/error/error";

import "./firebase/config.js";

function AppProviders({ children }) {
  const engine = new Styletron();
  return (
    <TopErrorBoundary
      FallbackComponent={(error) => (
        <ErrorScreen error={error} topErrorLevel={true} />
      )}
    >
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <ToasterContainer
            autoHideDuration={2000}
            placement={PLACEMENT.bottomRight}
          >
            <UserProvider>
              <QueryClientProvider client={queryClient}>
                <BrowserRouter>{children}</BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </UserProvider>
          </ToasterContainer>
        </BaseProvider>
      </StyletronProvider>
    </TopErrorBoundary>
  );
}

export default AppProviders;
