/** @jsxImportSource @emotion/react */
import React from "react";
import { Logo } from "./components/logo";
import Form from "./components/form";
import { Button, Dialog } from "./components/lib";
import "@reach/dialog/styles.css";
import { signIn, signUp } from "./firebase/auth";
import { useAsync } from "./util/hooks";

const R = require("ramda");

function UnauthenticatedApp() {
  const [showModal, setShowModal] = React.useState(false);
  const showLoginModal = showModal === "login";
  const showRegisterModal = showModal === "register";
  const closeModal = R.compose(setShowModal, R.F);

  const { run, error, isLoading } = useAsync();
  const login = R.compose(run, signIn);
  const register = R.compose(run, signUp);

  return (
    <div
      css={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div
        css={{
          display: "flex",
          gap: ".5rem",
        }}
      >
        <div>
          <Button
            variant="primary"
            onClick={R.compose(setShowModal, R.always("login"))}
          >
            login
          </Button>
        </div>
        <div>
          <Button
            variant="secondary"
            onClick={R.compose(setShowModal, R.always("register"))}
          >
            register
          </Button>
        </div>
      </div>
      <Dialog
        aria-label="Login form"
        isOpen={showLoginModal}
        onDismiss={closeModal}
      >
        <button className="close-button" onClick={closeModal}>
          <span aria-hidden>×</span>
        </button>
        <Form
          formFor="login"
          onSubmit={login}
          isLoading={isLoading}
          isError={error}
        />
      </Dialog>
      <Dialog
        aria-label="Register form"
        isOpen={showRegisterModal}
        onDismiss={closeModal}
      >
        <button className="close-button" onClick={closeModal}>
          <span aria-hidden>×</span>
        </button>
        <Form
          formFor="register"
          onSubmit={register}
          isLoading={isLoading}
          isError={error}
        />
      </Dialog>
    </div>
  );
}

export default UnauthenticatedApp;
