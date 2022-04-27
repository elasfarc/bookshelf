import { useInfiniteQuery, useQueryClient } from "react-query";
import { client } from "../client-api";

const R = require("ramda");
const PAGE_RESULTS_LIMIT = 9;

const updateQueryCacheWithInfiniteData = R.curryN(
  4,
  function (queryCache, dataPath, queryKey, { pages }) {
    for (let data of R.path(dataPath, R.last(pages)))
      queryCache.setQueryData(
        queryKey.reduce(
          (acc, ele) => [...acc, ele[0] === "." ? data[ele.slice(1)] : ele],
          []
        ),
        data
      );
  }
);

function useInfiniteSearch({ query }) {
  const queryClient = useQueryClient();

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
      onSuccess: updateQueryCacheWithInfiniteData(
        queryClient,
        ["items"],
        ["book", ".id"]
      ),
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
