import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
/** @jsxImportSource @emotion/react */
import { Client as Styletron } from "styletron-engine-atomic";
import DiscoverBooks from "./pages/discover";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import SideNavigation from "./components/side-navigation";
import Book from "./pages/book";
import NotFound from "./pages/404";
import ReadingListScreen from "./pages/reading-lists";
import FinishedScreen from "./pages/finished";

import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import { usePrefetchUserList } from "./util/react-query/user-list";

const engine = new Styletron();

function Home() {
  const navigate = useNavigate();
  return React.useEffect(() => {
    navigate("/list");
  });
}
function AuthenticatedApp() {
  const { pathname: currentLocation } = useLocation();
  usePrefetchUserList();

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Header />
        <div css={{ display: "flex", gap: "2rem" }}>
          <SideNavigation active={currentLocation} />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/list" element={<ReadingListScreen />} />
            <Route index path="/finished" element={<FinishedScreen />} />
            <Route path="/discover" element={<DiscoverBooks />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}
export default AuthenticatedApp;
