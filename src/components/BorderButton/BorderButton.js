import React from "react";
import { StyledBorderButton } from "./StyledBorderButton";
const BorderButton = ({ onClick, title, btnColor }) => {
  return (
    <StyledBorderButton btnColor={btnColor} onClick={onClick}>
      {title}
    </StyledBorderButton>
  );
};

export default BorderButton;
