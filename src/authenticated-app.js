/** @jsxImportSource @emotion/react */
import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";

import DiscoverBooks from "./pages/discover";
import Header from "./components/header";
import SideNavigation from "./components/side-navigation";
import Book from "./pages/book";
import ReadingListScreen from "./pages/reading-lists";
import FinishedScreen from "./pages/finished";
import NotFound from "./pages/404";
import ErrorScreen from "./pages/error/error";

import { usePrefetchUserList } from "./util/react-query/user-list";

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
    <>
      <Header />
      <div css={{ display: "flex", gap: "2rem" }}>
        <SideNavigation active={currentLocation} />
        <ErrorBoundary FallbackComponent={ErrorScreen}>
          <AuthAppWithRoutes />
        </ErrorBoundary>
      </div>
    </>
  );
}

function AuthAppWithRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route index path="/list" element={<ReadingListScreen />} />
      <Route index path="/finished" element={<FinishedScreen />} />
      <Route path="/discover" element={<DiscoverBooks />} />
      <Route path="/book/:id" element={<Book />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default AuthenticatedApp;
