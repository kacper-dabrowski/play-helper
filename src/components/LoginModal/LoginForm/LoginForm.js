import React from "react";
import LoginFormHeader from "./LoginFormHeader/LoginFormHeader";
import LoginInputs from "./LoginInputs/LoginInputs";
import LoginSubmitButton from "./LoginSubmitButton/LoginSubmitButton";
import { StyledLoginForm } from "./StyledLoginForm";

const LoginForm = () => {
  return (
    <StyledLoginForm>
      <LoginFormHeader>Zaloguj się</LoginFormHeader>
      <LoginInputs />
      <LoginSubmitButton />
    </StyledLoginForm>
  );
};

export default LoginForm;
