import React from "react";
import {
  StyledSuccessMessage,
  SuccessMessageContainer,
} from "./StyledSuccessMessage";

const SuccessMessage = ({ message }) => {
  return (
    <SuccessMessageContainer>
      <StyledSuccessMessage>{message}</StyledSuccessMessage>
    </SuccessMessageContainer>
  );
};

export default SuccessMessage;
