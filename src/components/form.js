/** @jsxImportSource @emotion/react */
import React from "react";
import { Input, Button, Spinner } from "./lib";

function Form({ formFor, onSubmit }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        "> div": {
          width: "100%",
          margin: "10px auto",
          maxWidth: "300px",
          "> label": { display: "block", fontSize: "90%" },
        },
      }}
    >
      <div>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div css={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Button
          type="submit"
          variant={formFor === "login" ? "primary" : "secondary"}
        >
          {formFor}
        </Button>
        <Spinner />
      </div>
    </form>
  );
}

export default Form;
