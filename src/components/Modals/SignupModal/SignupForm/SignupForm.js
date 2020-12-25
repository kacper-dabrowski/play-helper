import React from "react";
import { SignupFormHeader } from "./SignupFormHeader/SignupFormHeader";
import { StyledSignupForm } from "./StyledSignupForm";
import LoginInput from "../../LoginModal/LoginForm/LoginInputs/LoginInput/LoginInput";
import SubmitButton from "./SignupSubmitButton/SignupSubmitButton";
const SignUpForm = () => {
  return (
    <StyledSignupForm>
      <SignupFormHeader>Zarejestruj się</SignupFormHeader>
      <LoginInput placeholder={"Nazwa użytkownika"} />
      <LoginInput placeholder={"Hasło"} type={"password"} />
      <LoginInput placeholder={"Potwierdź hasło"} type={"password"} />
      <SubmitButton />
    </StyledSignupForm>
  );
};

export default SignUpForm;
