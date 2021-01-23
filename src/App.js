import React, { Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import Logout from "./components/Logout/Logout";
import Spinner from "./components/Spinner/Spinner";
import WelcomeScreen from "./containers/WelcomeScreen/WelcomeScreen";
import * as actions from "./store/actions";
const Support = React.lazy(() => import("./containers/Support/Support"));
const PlayNext = React.lazy(() => import("./containers/PlayNext/PlayNext"));
const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup();
  });

  return (
    <Switch>
      <Suspense fallback={<Spinner />}>
        <Route path={"/support"}>
          <Support />
        </Route>
        <Route path={"/next"}>
          <PlayNext />
        </Route>
        <Route path={"/logout"} render={() => <Logout />} />
        <Route path={"/"} exact>
          <WelcomeScreen />
        </Route>
      </Suspense>
    </Switch>
  );
};
const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
});

export default connect(null, mapDispatchToProps)(App);
