import React from "react";
import { TopbarContainer } from "./StyledTopbar";
import { TopbarButton } from "./TopbarButton/TopbarButton";

const Topbar = () => {
  return (
    <TopbarContainer>
      <TopbarButton>Zaloguj</TopbarButton>
    </TopbarContainer>
  );
};

export default Topbar;
