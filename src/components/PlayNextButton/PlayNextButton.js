import React from "react";
import { StyledPlayNextButton } from "./StyledPlayNextButton";

const PlayNextButton = ({ title, clicked }) => {
  return <StyledPlayNextButton onClick={clicked}>{title}</StyledPlayNextButton>;
};

export default PlayNextButton;
