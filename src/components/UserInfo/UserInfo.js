import React from "react";
import { StyledUserInfo } from "./StyledUserInfo";

const UserInfo = ({ username }) => {
  return <StyledUserInfo>{username}</StyledUserInfo>;
};

export default UserInfo;
