import React from "react";
import NavbarItems from "./NavbarItems/NavbarItems";
import { StyledNavbar } from "./StyledNavbar";
import UserInfo from "./UserInfo/UserInfo";

const Navbar = ({ username }) => {
  return (
    <StyledNavbar>
      <NavbarItems />
      <UserInfo username={username} />
    </StyledNavbar>
  );
};

export default Navbar;
