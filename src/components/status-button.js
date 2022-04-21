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

function TooltipButton({ icon: Icon, label, highlight, onClick }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

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
        onClick={() => setIsLoading(true)}
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
function StatusButtons() {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <TooltipButton
        label="Unmark as read"
        icon={FaBook}
        highlight={colors.yellow}
      />
      <TooltipButton
        label="Mark as read"
        icon={FaCheckCircle}
        highlight={colors.success}
      />
      <TooltipButton
        label="Add to list"
        icon={FaPlusCircle}
        highlight={colors.indigo}
      />
      <TooltipButton
        label="Remove from list"
        icon={FaMinusCircle}
        highlight={colors.danger}
      />
    </div>
  );
}

export default StatusButtons;
