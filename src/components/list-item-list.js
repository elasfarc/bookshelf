/** @jsxImportSource @emotion/react */
import React from "react";
import { useUserList } from "../util/react-query/user-list";
import { sortObjBy } from "../util/sort-user-list";
import BookList from "../components/book-list";
import { Spinner } from "./lib";
import SortBox from "./sort-box";

function ListItemList({
  filterListItems,
  onNoListItems,
  onNoFilteredItems,
  sortOptions,
  defaultSort,
}) {
  const [sort, setSort] = React.useState({
    sortBy: sortOptions.sortBy.TIME_ADDED,
    order: sortOptions.order.ASC,
  });

  const { userList, isIdle, isLoading } = useUserList();

  const handleSortChange = (e) => {
    setSort((prevOptions) => ({
      ...prevOptions,
      [e.target.name]: sortOptions[e.target.name][e.target.value],
    }));
  };

  if (isIdle || isLoading)
    return (
      <div
        css={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    );

  const userListItems = Object.values(userList);
  if (userListItems.length === 0)
    return (
      <div css={{ marginTop: "1em", fontSize: "1.2em" }}>{onNoListItems}</div>
    );
  const filteredListItems = userListItems.filter(filterListItems);

  const sortedUserList = sortObjBy({
    propPath: sort.sortBy,
    order: sort.order,
    data: filteredListItems,
  });

  if (filteredListItems.length === 0)
    return (
      <div css={{ marginTop: "1em", fontSize: "1.2em" }}>
        {onNoFilteredItems}
      </div>
    );

  return (
    <div css={{ display: "flex", flexDirection: "column" }}>
      {Object.entries(sortOptions).map(([sortFor, sortOptions]) => (
        <SortBox
          groupFor={sortFor}
          options={sortOptions}
          handleChange={handleSortChange}
          defaultSort={defaultSort}
        />
      ))}
      <BookList
        books={sortedUserList.map(({ itemId, itemData }) => ({
          id: itemId,
          volumeInfo: itemData,
        }))}
      />
    </div>
  );
}

export default ListItemList;
