/** @jsxImportSource @emotion/react */
import React from "react";
import { Input, Spinner } from "./components/lib";
import { FaSearch, FaTimes } from "react-icons/fa";
import Tooltip from "@reach/tooltip";
import "@reach/tooltip/styles.css";
import { client } from "./util/client-api";
import BookList from "./components/book-list";
import * as Colors from "./styles/colors";
import { useAsync } from "./util/hooks";

const R = require("ramda");

function DiscoverBooks() {
  const [query, setQuery] = React.useState("");
  const { run, data, error, isLoading, isError, isSuccess } = useAsync({
    status: Boolean(query.trim()) ? "pending" : "idle",
  });
  console.log({ isLoading, isError, isSuccess, data, error });

  function handleSearchSubmit(event) {
    event.preventDefault();
    const { value } = event.target.elements.search;
    return value !== query ? setQuery(value) : null;
  }

  React.useEffect(() => {
    R.unless(
      R.compose(R.isEmpty, R.trim),
      R.compose(run, client, R.concat("q="), encodeURIComponent)
    )(query);
  }, [query, run]);

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
            {isError ? (
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
      ) : isError ? (
        <div css={{ color: Colors.danger }}>
          <p>there was an error</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
    </div>
  );
}

export default DiscoverBooks;
