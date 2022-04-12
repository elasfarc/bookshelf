import styled from "@emotion/styled/macro";
import { Dialog as ReachDialog } from "@reach/dialog";

const Input = styled.input({
  width: "100%",
  borderRadius: "3px",
  border: "1px solid #f1f1f4",
  background: "#f1f2f7",
  padding: "8px 12px",
});

const Button = styled.button(({ variant }) => ({
  color: variant === "primary" ? "#fff" : "#434449",
  backgroundColor: variant === "primary" ? "#3F51B5" : "#F1F2F7",
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
  "@media (max-width: 991px)": {
    width: "100%",
    margin: "10vh auto",
  },
});

export { Input, Button, Dialog };
