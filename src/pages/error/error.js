/** @jsxImportSource @emotion/react */
import errorImg from "./cherry.png";
import { Link } from "react-router-dom";

function ErrorScreen({
  error,
  resetErrorBoundary,
  topErrorLevel = false,
} = {}) {
  const errorMessage = error.message ?? error.error.message ?? error ?? "";

  return (
    <div
      css={{
        marginTop: "4rem",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img alt="error happened" src={errorImg} width="40%" />

        <div css={{ marginTop: "2rem", textAlign: "center" }}>
          <h3>Some thing went wrong!</h3>
          <pre css={{ color: "red" }}>{errorMessage}</pre>
        </div>

        <button onClick={resetErrorBoundary}>
          {topErrorLevel ? null : <Link to="/">Go Home</Link>}
        </button>
      </div>
    </div>
  );
}

export default ErrorScreen;
