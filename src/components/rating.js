import * as React from "react";
import { StarRating } from "baseui/rating";
import { useUserList } from "../util/react-query/user-list";

export default function Rating({ book: { bookId } }) {
  const { userList, updateRating } = useUserList();
  const bookRating = userList[bookId]?.rating ?? null;

  return (
    <StarRating
      numItems={5}
      onChange={(data) => updateRating.mutate({ bookId, rate: data.value })}
      size={15}
      value={bookRating}
    />
  );
}
