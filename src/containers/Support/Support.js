import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import config from "../../shared/identifiers";
import routes from "../../shared/routes";
import { Container, StyledSupport } from "./StyledSupport";
import Navbar from "./SupportNavbar/Navbar";

const Srq = React.lazy(() => import("./Srq/Srq"));
const Payments = React.lazy(() => import("./Payments/Payments"));
const Double = React.lazy(() => import("./Double/Double"));
const Basic = React.lazy(() => import("./Basic/Basic"));

const Support = (props) => (
  <StyledSupport>
    <Navbar username={props.fullName} />
    <Container>
      <Switch>
        <Route path={routes.support.srq}>
          <Srq />
        </Route>
        <Route path={routes.support.basic}>
          <Basic name={props.fullName} />
        </Route>
        <Route exact path={routes.support.doubleOpened}>
          <Double type={config.double.opened} />
        </Route>
        <Route exact path={routes.support.doubleClosed}>
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
