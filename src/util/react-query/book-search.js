import { useInfiniteQuery } from "react-query";
import { client } from "../client-api";

const R = require("ramda");
const PAGE_RESULTS_LIMIT = 9;

function useInfiniteSearch({ query }) {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    error,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["book-search", query],
    R.converge(
      R.compose(
        client,
        R.concat(R.__, `&maxResults=${PAGE_RESULTS_LIMIT}`),
        R.concat
      ),
      [
        R.compose(
          R.concat(R.__, "&"),
          R.concat("q="),
          encodeURIComponent,
          R.last,
          R.prop("queryKey")
        ),
        R.compose(
          R.concat("startIndex="),
          R.toString,
          R.unless(R.compose(R.not, R.isNil), R.always(0)),
          R.prop("pageParam")
        ),
      ]
    ),
    {
      getNextPageParam: (lastPage, allPages) =>
        allPages.length < lastPage.totalItems
          ? allPages.length * PAGE_RESULTS_LIMIT
          : null,
      staleTime: Infinity,
      enabled: R.compose(R.not, R.isEmpty, R.trim)(query),
    }
  );

  return {
    data,
    hasNextPage,
    fetchNextPage,
    error,
    isLoading,
    isError,
    isSuccess,
    isFetchingNextPage,
  };
}

export { useInfiniteSearch };
