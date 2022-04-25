import styled from "@emotion/styled/macro";
import { keyframes } from "@emotion/react";
import { Dialog as ReachDialog } from "@reach/dialog";
import * as colors from "../styles/colors";
import * as mq from "../styles/media-queries";
import { FaSpinner } from "react-icons/fa";

const Input = styled.input({
  width: "100%",
  borderRadius: "3px",
  border: `1px solid ${colors.gray10}`,
  background: colors.gray,
  padding: "8px 12px",
});

const Button = styled.button(({ variant }) => ({
  color: variant === "primary" ? colors.base : colors.text,
  backgroundColor: variant === "primary" ? colors.indigo : colors.gray,
  borderRadius: "3px",
  padding: "10px 15px",
  border: "none",
  textTransform: "capitalize",
}));

const Dialog = styled(ReachDialog)({
  maxWidth: "450px",
  borderRadius: "30px",
  paddingBottom: "3.5em",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
  margin: "20vh auto",
  [mq.small]: {
    width: "100%",
    margin: "10vh auto",
  },
});

const CircleButton = styled.button({
  borderRadius: "30px",
  padding: "0",
  width: "40px",
  height: "40px",
  border: `1px solid ${colors.gray10}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});
const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});

Spinner.defaultProps = {
  "aria-label": "loading",
};

export { Input, Button, Dialog, Spinner, CircleButton };
