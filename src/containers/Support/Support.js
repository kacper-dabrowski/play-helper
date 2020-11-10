import React from "react";
import { Route, Switch } from "react-router";
import Basic from "./Basic/Basic";
import Double from "./Double/Double";
import LoginScreen from "./LoginScreen/LoginScreen";
import Payments from "./Payments/Payments";
import { Container, StyledSupport } from "./StyledSupport";
import NavbarItems from "./SupportNavbar/NavbarItems/NavbarItems";
const Support = () => (
  <StyledSupport>
    <NavbarItems />
    <Container>
      <Switch>
        <Route path={"/support"} exact>
          <LoginScreen />
        </Route>
        <Route path={"/support/basic"}>
          <Basic />
        </Route>
        <Route path={"/support/double-opened"}>
          <Double type={"opened"} />
        </Route>
        <Route path={"/support/double-closed"}>
          <Double type={"closed"} />
        </Route>
        <Route>
          <Payments />
        </Route>
      </Switch>
    </Container>
  </StyledSupport>
);

export default Support;
