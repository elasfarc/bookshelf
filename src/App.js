import React from "react";
import "./App.css";
import { Logo } from "./components/logo";
import { Dialog } from "@reach/dialog";
import Form from "./components/form";
import "@reach/dialog/styles.css";
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
    <>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={R.compose(setShowModal, R.always("login"))}>
          login
        </button>
      </div>
      <div>
        <button onClick={R.compose(setShowModal, R.always("register"))}>
          register
        </button>
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
    </>
  );
}

export default App;
