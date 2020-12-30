import { Route, Switch } from "react-router";
import Logout from "./components/Logout/Logout";
import Support from "./containers/Support/Support";
import WelcomeScreen from "./containers/WelcomeScreen/WelcomeScreen";

const App = () => {
  return (
    <Switch>
      <Route path={"/support"}>
        <Support />
      </Route>
      <Route path={"/next"}>
        <div>NEXT</div>
      </Route>
      <Route path={"/logout"} render={() => <Logout />} />
      <Route path={"/"} exact>
        <WelcomeScreen />
      </Route>
    </Switch>
  );
};

export default App;
