import React from "react";
import LoginInput from "./LoginInput/LoginInput";
import { LoginInputsWrapper } from "./StyledLoginInputs";

const LoginInputs = () => {
  return (
    <LoginInputsWrapper>
      <LoginInput type="text" placeholder={"Nazwa użytkownika"} />
      <LoginInput type="password" placeholder={"Hasło"} />
    </LoginInputsWrapper>
  );
};

export default LoginInputs;
