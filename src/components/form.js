import React from "react";

function Form({ formFor, onSubmit }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">{formFor}</button>
      </div>
    </form>
  );
}

export default Form;
