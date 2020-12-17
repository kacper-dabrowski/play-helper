import React from "react";
import NavbarItem from "./NavbarItem/NavbarItem";
import { StyledNavbarItems } from "./StyledNavbarItems";

const NavbarItems = (props) => (
  <StyledNavbarItems>
    <NavbarItem path={"/support/basic"} title={"Zamknięcie zwykłe"} exact />
    <NavbarItem
      path={"/support/double-opened"}
      title={"Dubel do otwartego"}
      exact
    />
    <NavbarItem
      path={"/support/double-closed"}
      title={"Dubel do zamkniętego"}
      exact
    />
    <NavbarItem path={"/support/payments"} title={"Raty"} exact />
  </StyledNavbarItems>
);

export default NavbarItems;
