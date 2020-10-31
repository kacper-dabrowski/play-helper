import { Route, Switch } from "react-router";
import WelcomeScreen from "./containers/WelcomeScreen/WelcomeScreen";

const App = () => {
  return (
    <Switch>
      <Route path={"/support"}>
        <div>Support</div>
      </Route>
      <Route path={"/next"}>
        <div>NEXT</div>
      </Route>
      <Route path={"/"} exact>
        <WelcomeScreen />
      </Route>
    </Switch>
  );
};

export default App;
