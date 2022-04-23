import { useQuery } from "react-query";
import { useUser } from "../../context/userContext";
import { userListDoc } from "../../firebase/list";

const R = require("ramda");

// const getData = R.invoker(0, "data");

function useUserList() {
  const {
    user,
    user: { uid },
  } = useUser();

  const {
    get: getList,
    addItem: addToList,
    removeItem: removeFromList,
    addItemProp,
    removeItemProp,
  } = userListDoc(user);

  const {
    data: userList,
    isIdle,
    isLoading,
    isError,
    error,
  } = useQuery(["user-list", uid], getList);

  const markAsRead = (bookId) =>
    addItemProp({
      itemId: bookId,
      prop: "finished",
      value: "NOW",
    });

  const unmarkAsRead = (bookId) =>
    removeItemProp({
      itemId: bookId,
      prop: "finished",
    });

  return {
    userList,
    isIdle,
    isLoading,
    isError,
    error,
    addToList,
    removeFromList,
    markAsRead,
    unmarkAsRead,
  };
}

export default useUserList;
