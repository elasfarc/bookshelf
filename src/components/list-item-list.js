/** @jsxImportSource @emotion/react */
import { useUserList } from "../util/react-query/user-list";
import BookList from "../components/book-list";
import { Spinner } from "./lib";

function ListItemList({
  filterListItems,
  onNoListItems,
  onNoFilteredItems,
  sortOptions,
  defaultSort,
}) {
  const { userList, isIdle, isLoading } = useUserList();

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
  if (filteredListItems.length === 0)
    return (
      <div css={{ marginTop: "1em", fontSize: "1.2em" }}>
        {onNoFilteredItems}
      </div>
    );

  return (
    <BookList
      books={filteredListItems.map(({ itemId, itemData }) => ({
        id: itemId,
        volumeInfo: itemData,
      }))}
    />
  );
}

export default ListItemList;
