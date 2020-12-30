import React from "react";
import UserInfo from "../../../components/UserInfo/UserInfo";
import { TopbarContainer } from "./StyledTopbar";
import { TopbarButton } from "./TopbarButton/TopbarButton";
import { TopbarNavlink } from "./TopbarNavlink/TopbarNavlink";

const Topbar = ({
  onLoginModalOpened,
  onSignInModalOpened,
  isAuthenticated,
  fullName,
}) => {
  let content = isAuthenticated ? (
    <>
      <TopbarNavlink to={"/logout"}>Wyloguj</TopbarNavlink>
      <UserInfo username={fullName} />
    </>
  ) : (
    <>
      <TopbarButton onClick={onLoginModalOpened}>Zaloguj</TopbarButton>
      <TopbarButton onClick={onSignInModalOpened}>Załóż konto</TopbarButton>
    </>
  );
  return <TopbarContainer>{content}</TopbarContainer>;
};

export default Topbar;
