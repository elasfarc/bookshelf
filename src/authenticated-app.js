import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import DiscoverBooks from "./discover";
import Header from "./components/header";

const engine = new Styletron();

function AuthenticatedApp() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Header />
        <DiscoverBooks />
      </BaseProvider>
    </StyletronProvider>
  );
}
export default AuthenticatedApp;
