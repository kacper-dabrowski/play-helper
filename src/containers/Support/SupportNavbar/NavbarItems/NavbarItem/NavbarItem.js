import React from "react";
import { StyledNavlink } from "./StyledNavbarItem";

const NavbarItem = (props) => (
  <StyledNavlink to={props.path}>{props.title}</StyledNavlink>
);

export default NavbarItem;
