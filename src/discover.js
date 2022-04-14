/** @jsxImportSource @emotion/react */
import React from "react";
import { Input, Spinner } from "./components/lib";
import { FaSearch, FaTimes } from "react-icons/fa";
import Tooltip from "@reach/tooltip";
import "@reach/tooltip/styles.css";
import { client } from "./util/client-api";
import BookList from "./components/book-list";
import * as Colors from "./styles/colors";

const actionTypes = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};
function stateReducer(state, { type, data, error, query }) {
  switch (type) {
    case actionTypes.PENDING:
      return { ...state, status: actionTypes.PENDING, query };
    case actionTypes.RESOLVED:
      return { ...state, status: actionTypes.RESOLVED, data, error: null };
    case actionTypes.REJECTED:
      return { ...state, status: actionTypes.REJECTED, error, data: null };

    default:
      throw new Error("un-supported action type");
  }
}

function DiscoverBooks() {
  const initState = { status: "idle", query: null, data: null, error: null };
  const [{ status, query, data, error }, dispatch] = React.useReducer(
    stateReducer,
    initState
  );
  console.log({ status, query, data, error });

  const isLoading = status === actionTypes.PENDING;
  const isSuccess = status === actionTypes.RESOLVED;
  const isFail = status === actionTypes.REJECTED;

  function handleSearchSubmit(event) {
    event.preventDefault();
    const { value } = event.target.elements.search;
    return value !== query
      ? dispatch({ type: actionTypes.PENDING, query: value })
      : null;
  }

  React.useEffect(() => {
    if (!query) return;
    client(`q=${encodeURIComponent(query)}`).then(
      (data) => dispatch({ type: actionTypes.RESOLVED, data }),
      (error) => dispatch({ type: actionTypes.REJECTED, error })
    );
  }, [query]);
  return (
    <div
      css={{
        padding: "3rem 0",
        margin: "auto",
        width: "90%",
        maxWidth: "1000px",
      }}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input placeholder="Search books..." id="search" />
        <Tooltip label="search books">
          <button
            type="submit"
            css={{
              border: "none",
              background: "transparent",
              position: "relative",
              left: "97%",
              top: "-1.75rem",
            }}
          >
            {isFail ? (
              <FaTimes css={{ color: Colors.danger }} />
            ) : isLoading ? (
              <Spinner />
            ) : (
              <FaSearch />
            )}
          </button>
        </Tooltip>
      </form>

      {isSuccess ? (
        <BookList books={data.items} />
      ) : isFail ? (
        <div css={{ color: Colors.danger }}>
          <p>there was an error</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
    </div>
  );
}

export default DiscoverBooks;
