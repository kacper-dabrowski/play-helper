import React from "react";
import {
  StyledErrorMessage,
  ErrorMessageContainer,
} from "./StyledErrorMessage";

const ErrorMessage = ({ errorMessage }) => {
  return (
    <ErrorMessageContainer>
      <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
    </ErrorMessageContainer>
  );
};

export default ErrorMessage;
