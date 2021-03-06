import { Link } from "react-router-dom";
import ListItemList from "../components/list-item-list";
import { finishedSortOptions, defaultSort } from "../util/sort-user-list";

const FinishedScreen = () => {
  return (
    <ListItemList
      filterListItems={(book) => book.finished}
      onNoListItems={
        <p>
          Hey there! This is where books will go when you've finished reading
          them. Get started by heading over to{" "}
          <Link to="/discover">the Discover page</Link> to add books to your
          list.
        </p>
      }
      onNoFilteredItems={
        <p>
          Looks like you've got some reading to do! Check them out in your{" "}
          <Link to="/list">reading list</Link> or{" "}
          <Link to="/discover">discover more</Link>.
        </p>
      }
      sortOptions={finishedSortOptions}
      defaultSort={defaultSort}
    />
  );
};

export default FinishedScreen;
