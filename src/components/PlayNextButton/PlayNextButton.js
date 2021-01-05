import React from "react";
import { StyledPlayNextButton } from "./StyledPlayNextButton";

const PlayNextButton = ({ title, onClick, active }) => {
  return (
    <StyledPlayNextButton onClick={onClick} active={active}>
      {title}
    </StyledPlayNextButton>
  );
};

export default PlayNextButton;
