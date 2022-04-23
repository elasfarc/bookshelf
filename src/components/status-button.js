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

import useUserList from "../util/react-query/user-list";
import { useAsync } from "../util/hooks";
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
  const {
    userList,
    isIdle,
    isLoading,
    isError,
    error,
    addToList,
    removeFromList,
    markAsRead,
    unmarkAsRead,
  } = useUserList();

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
            onClick={() => unmarkAsRead(bookId)}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            icon={FaCheckCircle}
            highlight={colors.success}
            onClick={() => markAsRead(bookId)}
          />
        )
      ) : null}

      {bookInList ? (
        <TooltipButton
          label="Remove from list"
          icon={FaMinusCircle}
          highlight={colors.danger}
          onClick={() => removeFromList(bookId)}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          icon={FaPlusCircle}
          highlight={colors.indigo}
          onClick={() => addToList(bookId)}
        />
      )}
    </div>
  );
}

export default StatusButtons;
