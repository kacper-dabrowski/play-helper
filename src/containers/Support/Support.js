import React from "react";
import { Route, Switch } from "react-router";
import MainTextarea from "../../components/MainTextarea/MainTextarea";
import Basic from "./Basic/Basic";
import Double from "./Double/Double";
import { Container, StyledSupport } from "./StyledSupport";
import NavbarItems from "./SupportNavbar/NavbarItems/NavbarItems";
const Support = () => (
  <StyledSupport>
    <NavbarItems />
    <Container>
      <Switch>
        <Route path={"/support/basic"}>
          <Basic />
        </Route>
        <Route path={"/support/double-opened"}>
          <Double type={"opened"} />
        </Route>
        <Route path={"/support/double-closed"}>
          <Double type={"closed"} />
        </Route>
      </Switch>
      <MainTextarea />
    </Container>
  </StyledSupport>
);

export default Support;
