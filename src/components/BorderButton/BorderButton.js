import React from "react";
import { StyledBorderButton } from "./StyledBorderButton";
const BorderButton = ({
  onClick,
  title,
  mainColor,
  secondColor,
  isClicked,
}) => {
  return (
    <StyledBorderButton
      mainColor={mainColor}
      secondColor={secondColor}
      isClicked={isClicked}
      onClick={onClick}
    >
      {title}
    </StyledBorderButton>
  );
};

export default BorderButton;
