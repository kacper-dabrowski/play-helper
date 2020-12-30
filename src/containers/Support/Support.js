import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import config from "../../shared/identifiers";
import routes from "../../shared/routes";
import Basic from "./Basic/Basic";
import Double from "./Double/Double";
import Payments from "./Payments/Payments";
import Srq from "./Srq/Srq";
import { Container, StyledSupport } from "./StyledSupport";
import Navbar from "./SupportNavbar/Navbar";

const Support = (props) => (
  <StyledSupport>
    <Navbar username={props.fullName} />
    <Container>
      <Switch>
        <Route path={routes.support.srq}>
          <Srq />
        </Route>
        <Route path={routes.support.basic}>
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
        <Route path={routes.support.main} exact></Route>
      </Switch>
    </Container>
  </StyledSupport>
);
const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
  fullName: state.auth.fullName,
});
export default connect(mapStateToProps, null)(Support);
