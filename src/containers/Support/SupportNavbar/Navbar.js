import React from "react";
import NavbarItems from "./NavbarItems/NavbarItems";
import { StyledNavbar } from "./StyledNavbar";
import UserInfo from "../../../components/UserInfo/UserInfo";
import ArrowBack from "../../../components/ArrowBack/ArrowBack";
import config from "../../../shared/identifiers";

const Navbar = ({ username }) => {
  return (
    <StyledNavbar>
      <ArrowBack type={config.projects.SUPPORT} />
      <NavbarItems />
      <UserInfo username={username} />
    </StyledNavbar>
  );
};

export default Navbar;
