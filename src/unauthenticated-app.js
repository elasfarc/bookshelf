/** @jsxImportSource @emotion/react */
import { Logo } from "./components/logo";
import Form from "./components/form";
import { Button } from "./components/lib";
import "@reach/dialog/styles.css";
import { signIn, signUp } from "./firebase/auth";
import { useAsync } from "./util/hooks";

import { Modal, ModalOpenButton, ModalContents } from "./components/Modal";

const R = require("ramda");

function UnauthenticatedApp() {
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
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="login form" title="Login">
            <Form
              formFor="login"
              onSubmit={login}
              isLoading={isLoading}
              isError={error}
            />
          </ModalContents>
        </Modal>

        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Register form" title="Register">
            <Form
              formFor="register"
              onSubmit={register}
              isLoading={isLoading}
              isError={error}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
}

export default UnauthenticatedApp;
