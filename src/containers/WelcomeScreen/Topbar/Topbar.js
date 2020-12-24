import React from "react";
import { TopbarContainer } from "./StyledTopbar";
import { TopbarButton } from "./TopbarButton/TopbarButton";

const Topbar = ({ onLoginModalOpened, onSignInModalOpened }) => {
  return (
    <TopbarContainer>
      <TopbarButton onClick={onLoginModalOpened}>Zaloguj</TopbarButton>
      <TopbarButton onClick={onSignInModalOpened}>Załóż konto</TopbarButton>
    </TopbarContainer>
  );
};

export default Topbar;
