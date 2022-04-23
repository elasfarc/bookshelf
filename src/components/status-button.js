/** @jsxImportSource @emotion/react */
import React from "react";
import Tooltip from "@reach/tooltip";
import "@reach/tooltip/styles.css";
import {
  FaCheckCircle,
  FaPlusCircle,
  FaTimesCircle,
  FaMinusCircle,
  FaBook,
} from "react-icons/fa";
import { Spinner, CircleButton } from "./lib";
import * as colors from "../styles/colors";

import { useUser } from "../context/userContext";
import { useAsync } from "../util/hooks";
import { userListDoc } from "../firebase/list";
const R = require("ramda");

function TooltipButton({ icon: Icon, label, highlight, onClick }) {
  const { run, error, isLoading, isError } = useAsync();
  const handleClick = () => run(onClick());

  return (
    <Tooltip label={label}>
      <CircleButton
        css={{
          ":hover,:focus": {
            color: isLoading ? "inherit" : highlight,
          },
          cursor: isLoading ? "wait" : "inherit",
        }}
        disabled={isLoading}
        onClick={handleClick}
      >
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <FaTimesCircle css={{ color: colors.danger }} />
        ) : (
          <Icon />
        )}
      </CircleButton>
    </Tooltip>
  );
}
function StatusButtons({ book: { bookId } }) {
  const { user } = useUser();
  const {
    run,
    data: userListSnap,
    error,
    isIdle,
    isLoading,
    isError,
    isSuccess,
  } = useAsync();
  const userList = userListSnap?.data();
  const markAsRead = () =>
    userListDoc(user).addItemProp({
      itemId: bookId,
      prop: "finished",
      value: "NOW",
    });
  const unmarkAsRead = () =>
    userListDoc(user).removeItemProp({
      itemId: bookId,
      prop: "finished",
    });

  React.useEffect(() => {
    run(userListDoc(user).get());
  }, [run, user]);

  if (isLoading || isIdle) return null;
  if (isError) return <h6>Error ......</h6>;
  const bookInList = R.has(bookId, userList);
  const bookIsFinished = R.has("finished")(userList[bookId]);

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      {bookInList ? (
        bookIsFinished ? (
          <TooltipButton
            label="Unmark as read"
            icon={FaBook}
            highlight={colors.yellow}
            onClick={unmarkAsRead}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            icon={FaCheckCircle}
            highlight={colors.success}
            onClick={markAsRead}
          />
        )
      ) : null}

      {bookInList ? (
        <TooltipButton
          label="Remove from list"
          icon={FaMinusCircle}
          highlight={colors.danger}
          onClick={() => userListDoc(user).removeItem(bookId)}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          icon={FaPlusCircle}
          highlight={colors.indigo}
          onClick={() => userListDoc(user).addItem(bookId)}
        />
      )}
    </div>
  );
}

export default StatusButtons;
