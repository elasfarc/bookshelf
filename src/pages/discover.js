/** @jsxImportSource @emotion/react */
import React from "react";
import { Input, Spinner } from "../components/lib";
import { FaSearch, FaTimes } from "react-icons/fa";
import Tooltip from "@reach/tooltip";
import "@reach/tooltip/styles.css";
import BookList from "../components/book-list";
import * as Colors from "../styles/colors";
import { useInfiniteSearch } from "../util/react-query/book-search";
import InfiniteScroll from "react-infinite-scroller";

function DiscoverBooks() {
  const [query, setQuery] = React.useState("");
  const {
    data,
    hasNextPage,
    fetchNextPage,
    error,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteSearch({ query });

  console.log({ isLoading, isError, isSuccess, data, error });

  function handleSearchSubmit(event) {
    event.preventDefault();
    const { value } = event.target.elements.search;
    return value !== query ? setQuery(value) : null;
  }

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
        <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
          {data.pages.map((page, i) => (
            <BookList key={i} books={page.items} />
          ))}
        </InfiniteScroll>
      ) : isError ? (
        <div css={{ color: Colors.danger }}>
          <p>there was an error</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}

      {isFetchingNextPage && (
        <div css={{ display: "flex", justifyContent: "center" }}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default DiscoverBooks;
