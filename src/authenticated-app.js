import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
/** @jsxImportSource @emotion/react */
import { Client as Styletron } from "styletron-engine-atomic";
import DiscoverBooks from "./discover";
import Header from "./components/header";
import { Routes, Route, Link } from "react-router-dom";
import SideNavigation from "./components/side-navigation";

const engine = new Styletron();

function AuthenticatedApp() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Header />
        <div css={{ display: "flex", gap: "2rem" }}>
          <SideNavigation />
          <Routes>
            <Route index path="/" element={<DiscoverBooks />} />
          </Routes>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}
export default AuthenticatedApp;
