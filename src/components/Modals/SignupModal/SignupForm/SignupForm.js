import React, { useState } from "react";
import { SignupFormHeader } from "./SignupFormHeader/SignupFormHeader";
import { StyledSignupForm } from "./StyledSignupForm";
import LoginInput from "../../LoginModal/LoginForm/LoginInputs/LoginInput/LoginInput";
import SubmitButton from "./SignupSubmitButton/SignupSubmitButton";
import urls from "../../../../shared/urls";
import axios from "axios";
import { FormInputsWrapper } from "../SignupModalContainer";
const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasError, setHasError] = useState({});

  const signedUpHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      const error = new Error();
      error.message = "Hasła nie są takie same!";
      return setHasError(error);
    }
    if (!username) {
      const error = new Error();
      error.message = "Nazwa użytkownika nie może być pusta!";
      return setHasError(error);
    }
    if (!fullName) {
      const error = new Error();
      error.message = "Imię i nazwisko nie mogą być puste!";
      return setHasError(error);
    }

    const newUser = {
      username,
      password,
      fullName,
    };
    const signupRequest = await axios.post(
      urls.api + urls.signup,
      JSON.stringify(newUser),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (signupRequest.status !== 201) {
      const error = new Error();
      error.message = "Żądanie nie powiodło się.";
      setHasError(error);
    }
    console.warn(signupRequest.data);
  };

  if (hasError.message) {
  }

  return (
    <StyledSignupForm onSubmit={signedUpHandler}>
      <SignupFormHeader>Zarejestruj się</SignupFormHeader>
      <FormInputsWrapper>
        <LoginInput
          placeholder={"Nazwa użytkownika"}
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
        <LoginInput
          placeholder={"Imię i nazwisko"}
          onChange={(event) => setFullName(event.target.value)}
          value={fullName}
        />
        <LoginInput
          placeholder={"Hasło"}
          type={"password"}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <LoginInput
          placeholder={"Potwierdź hasło"}
          type={"password"}
          onChange={(event) => setConfirmPassword(event.target.value)}
          value={confirmPassword}
        />
      </FormInputsWrapper>
      <SubmitButton />
    </StyledSignupForm>
  );
};

export default SignUpForm;
