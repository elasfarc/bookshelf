/** @jsxImportSource @emotion/react */
import React from "react";
import "./App.css";
import { Logo } from "./components/logo";
import Form from "./components/form";
import "@reach/dialog/styles.css";
import "bootstrap/dist/css/bootstrap-reboot.css";
import { Button, Dialog } from "./components/lib";
import "./firebase/config.js";

const R = require("ramda");

function App() {
  const [showModal, setShowModal] = React.useState(false);
  const showLoginModal = showModal === "login";
  const showRegisterModal = showModal === "register";
  const closeModal = R.compose(setShowModal, R.F);

  const login = (formData) => {
    console.log(formData);
  };
  const register = (formData) => {
    console.log(formData);
  };
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
        <Form formFor="login" onSubmit={login} />
      </Dialog>
      <Dialog
        aria-label="Register form"
        isOpen={showRegisterModal}
        onDismiss={closeModal}
      >
        <button className="close-button" onClick={closeModal}>
          <span aria-hidden>×</span>
        </button>
        <Form formFor="register" onSubmit={register} />
      </Dialog>
    </div>
  );
}

export default App;
