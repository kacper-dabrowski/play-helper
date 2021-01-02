import React from "react";
import UserInfo from "../../../components/UserInfo/UserInfo";
import { StyledNavbar } from "./StyledNavbar";

const Navbar = ({ username }) => {
  return (
    <StyledNavbar>
      <UserInfo username={username} />
    </StyledNavbar>
  );
};

export default Navbar;
