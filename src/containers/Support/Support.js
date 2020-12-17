import React from "react";
import { Route, Switch } from "react-router";
import config from "../../shared/settings";
import Basic from "./Basic/Basic";
import Double from "./Double/Double";
import LoginScreen from "./LoginScreen/LoginScreen";
import Payments from "./Payments/Payments";
import { Container, StyledSupport } from "./StyledSupport";
import Navbar from "./SupportNavbar/Navbar";

const Support = () => (
  <StyledSupport>
    <Navbar username={"Konsultant Play"} />
    <Container>
      <Switch>
        <Route path={"/support"} exact>
          <LoginScreen />
        </Route>
        <Route path={"/support/basic"}>
          <Basic />
        </Route>
        <Route path={"/support/double-opened"}>
          <Double type={config.double.opened} />
        </Route>
        <Route path={"/support/double-closed"}>
          <Double type={config.double.closed} />
        </Route>
        <Route>
          <Payments />
        </Route>
      </Switch>
    </Container>
  </StyledSupport>
);

export default Support;
