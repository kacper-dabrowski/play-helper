import React from "react";
import LoginInput from "./LoginInput/LoginInput";
import { LoginInputsWrapper } from "./StyledLoginInputs";

const LoginInputs = ({ loginChangedHandler, passwordChangedHandler }) => {
  return (
    <LoginInputsWrapper>
      <LoginInput
        onChange={(event) => loginChangedHandler(event.target.value)}
        type="text"
        placeholder={"Nazwa użytkownika"}
      />
      <LoginInput
        onChange={(event) => passwordChangedHandler(event.target.value)}
        type="password"
        placeholder={"Hasło"}
      />
    </LoginInputsWrapper>
  );
};

export default LoginInputs;
