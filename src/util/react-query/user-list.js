import { useQuery, useMutation, useQueryClient } from "react-query";
import { useUser } from "../../context/userContext";
import { userListDoc } from "../../firebase/list";

const R = require("ramda");

function useUserList() {
  const {
    user,
    user: { uid },
  } = useUser();

  const {
    get: getList,
    addItem,
    removeItem,
    addItemProp,
    removeItemProp,
  } = userListDoc(user);

  const queryClient = useQueryClient();

  const invalidateUserList = R.compose(
    R.invoker(1, "invalidateQueries")(["user-list", uid]),
    R.always(queryClient)
  );

  const {
    data: userList,
    isIdle,
    isLoading,
    isError,
    error,
  } = useQuery(["user-list", uid], getList);

  const addToList = useMutation(addItem, {
    onSuccess: invalidateUserList,
  });

  const removeFromList = useMutation(removeItem, {
    onSuccess: invalidateUserList,
  });

  const markAsRead = useMutation(
    (bookId) => addItemProp({ itemId: bookId, prop: "finished", value: "NOW" }),
    { onSuccess: invalidateUserList }
  );

  const unmarkAsRead = useMutation(
    (bookId) => removeItemProp({ itemId: bookId, prop: "finished" }),
    { onSuccess: invalidateUserList }
  );

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
