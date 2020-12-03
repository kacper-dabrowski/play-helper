import React from "react";
import { TopbarContainer } from "./StyledTopbar";
import { TopbarButton } from "./TopbarButton/TopbarButton";

const Topbar = ({ onLoginModalOpened }) => {
  return (
    <TopbarContainer>
      <TopbarButton onClick={onLoginModalOpened}>Zaloguj</TopbarButton>
    </TopbarContainer>
  );
};

export default Topbar;
