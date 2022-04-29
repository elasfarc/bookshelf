import "./App.css";
import "bootstrap/dist/css/bootstrap-reboot.css";
import { useUser } from "./context/userContext";
import UnauthenticatedApp from "./unauthenticated-app";
import AuthenticatedApp from "./authenticated-app";

function App() {
  const { user } = useUser();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
