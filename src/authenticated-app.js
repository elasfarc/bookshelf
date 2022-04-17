import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
/** @jsxImportSource @emotion/react */
import { Client as Styletron } from "styletron-engine-atomic";
import DiscoverBooks from "./discover";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import SideNavigation from "./components/side-navigation";
import Book from "./pages/book";

import { useNavigate } from "react-router-dom";
import React from "react";

const engine = new Styletron();

function Home() {
  const navigate = useNavigate();
  return React.useEffect(() => {
    navigate("/discover");
  });
}
function AuthenticatedApp() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Header />
        <div css={{ display: "flex", gap: "2rem" }}>
          <SideNavigation />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/discover" element={<DiscoverBooks />} />
            <Route exact path="/book/:id" element={<Book />} />
          </Routes>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}
export default AuthenticatedApp;
