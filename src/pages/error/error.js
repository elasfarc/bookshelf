/** @jsxImportSource @emotion/react */
import errorImg from "./cherry.png";
import { Link } from "react-router-dom";

function ErrorScreen({ error }) {
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
          <pre css={{ color: "red" }}>{error.message}</pre>
        </div>
        <button>
          <Link to="/">Go Home</Link>
        </button>
      </div>
    </div>
  );
}

export default ErrorScreen;
