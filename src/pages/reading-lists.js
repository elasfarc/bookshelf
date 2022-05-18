import { Link } from "react-router-dom";
import ListItemList from "../components/list-item-list";
import { notFinishedSortOptions, defaultSort } from "../util/sort-user-list";

function ReadingListScreen() {
  return (
    <ListItemList
      filterListItems={(book) => !book.finished}
      onNoListItems={
        <p>
          Hey there! Welcome to your bookshelf reading list. Get started by
          heading over to <Link to="/discover">the Discover page</Link> to add
          books to your list.
        </p>
      }
      onNoFilteredItems={
        <p>
          Looks like you've finished all your books! Check them out in your{" "}
          <Link to="/finished">finished books</Link> or{" "}
          <Link to="/discover">discover more</Link>.
        </p>
      }
      sortOptions={notFinishedSortOptions}
      defaultSort={defaultSort}
    />
  );
}

export default ReadingListScreen;
