import React, { useState } from "react";
import { StyledSignupForm } from "./StyledSignupForm";
import LoginInput from "../../LoginModal/LoginForm/LoginInputs/LoginInput/LoginInput";
import * as actions from "../../../../store/actions";
import urls from "../../../../shared/urls";
import axios from "../../../../axios";
import { FormInputsWrapper } from "../SignupModalContainer";
import { connect } from "react-redux";
import Spinner from "../../../Spinner/Spinner";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import SubmitButton from "../../../SubmitButton/SubmitButton";
import { StyledFormHeader } from "../../../UI/Headers/StyledHeaders";
const SignUpForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasError, setHasError] = useState({});

  const signedUpHandler = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      const error = new Error("Hasło nie może być krótsze niż 6 znaków!");
      setHasError(error);
    }
    if (password !== confirmPassword) {
      const error = new Error("Hasła nie są takie same!");

      return setHasError(error);
    }
    if (!username) {
      const error = new Error("Nazwa użytkownika nie może być pusta!");

      return setHasError(error);
    }
    if (!fullName) {
      const error = new Error("Imię i nazwisko nie mogą być puste!");

      return setHasError(error);
    }

    const newUser = {
      username,
      password,
      fullName,
    };
    try {
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
      props.onAuth(username, password, props.closeModalHandler());
    } catch (error) {
      setHasError(error?.response?.data || error);
    }
  };
  const error = hasError.message ? (
    <ErrorMessage errorMessage={hasError.message} />
  ) : null;
  return (
    <StyledSignupForm onSubmit={signedUpHandler}>
      <StyledFormHeader>Zarejestruj się</StyledFormHeader>
      {error}
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
      {props.isLoading ? (
        <Spinner centered />
      ) : (
        <SubmitButton title={"Utwórz konto"} />
      )}
    </StyledSignupForm>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onAuth: (login, password, onSuccess) =>
    dispatch(actions.auth(login, password, onSuccess)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
