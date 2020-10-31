import React from "react";
import NavbarItem from "./NavbarItem/NavbarItem";
import { StyledNavbarItems } from "./StyledNavbarItems";

const NavbarItems = (props) => (
  <StyledNavbarItems>
    <NavbarItem path={"/support"} title={"Zamknięcie zwykłe"} />
    <NavbarItem path={"/support"} title={"Dubel do otwartego"} />
    <NavbarItem path={"/support"} title={"Dubel do zamkniętego"} />
    <NavbarItem path={"/support"} title={"Raty"} />
    <NavbarItem path={"/support"} title={"Zamknięcie telefoniczne"} />
  </StyledNavbarItems>
);

export default NavbarItems;
