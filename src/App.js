import "./App.css";
import { Logo } from "./components/logo";
function App() {
  return (
    <>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => alert("login is clicked")}>login</button>
      </div>
      <div>
        <button onClick={() => alert("register is clicked")}>register</button>
      </div>
    </>
  );
}

export default App;
