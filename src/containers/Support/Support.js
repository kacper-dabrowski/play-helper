import React from "react";
import { Route, Switch } from "react-router";
import config from "../../shared/identifiers";
import routes from "../../shared/routes";
import Basic from "./Basic/Basic";
import Double from "./Double/Double";
import Payments from "./Payments/Payments";
import Srq from "./Srq/Srq";
import { Container, StyledSupport } from "./StyledSupport";
import Navbar from "./SupportNavbar/Navbar";

const Support = () => (
  <StyledSupport>
    <Navbar username={"Konsultant Play"} />
    <Container>
      <Switch>
<<<<<<< HEAD
        <Route path={routes.support.srq}>
          <Srq />
        </Route>
        <Route path={routes.support.basic}>
=======
        <Route path={"/support"} exact></Route>
        <Route path={"/support/basic"}>
>>>>>>> Misc - Remove unused login screen component
          <Basic />
        </Route>
        <Route path={routes.support.doubleOpened}>
          <Double type={config.double.opened} />
        </Route>
        <Route path={routes.support.doubleClosed}>
          <Double type={config.double.closed} />
        </Route>
        <Route path={routes.support.payments}>
          <Payments />
        </Route>
        <Route path={routes.support.main} exact>
          <LoginScreen />
        </Route>
      </Switch>
    </Container>
  </StyledSupport>
);

export default Support;
