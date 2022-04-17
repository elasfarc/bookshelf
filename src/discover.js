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
        padding: "2rem 0",
        width: "90%",
      }}
    >
      <form
        onSubmit={handleSearchSubmit}
        css={{ position: "relative", maxWidth: "800px", margin: "auto" }}
      >
        <Input placeholder="Search books..." id="search" />
        <Tooltip label="search books">
          <button
            type="submit"
            css={{
              border: "none",
              background: "transparent",
              position: "absolute",
              left: "97%",
              top: "50%",
              transform: "translateY(-50%)",
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
