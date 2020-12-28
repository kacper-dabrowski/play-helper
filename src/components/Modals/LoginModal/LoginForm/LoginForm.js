import React, { useState } from "react";
import LoginFormHeader from "./LoginFormHeader/LoginFormHeader";
import LoginInputs from "./LoginInputs/LoginInputs";
import LoginSubmitButton from "./LoginSubmitButton/LoginSubmitButton";
import { StyledLoginForm } from "./StyledLoginForm";
import * as actions from "../../../../store/actions";
import { connect } from "react-redux";
import axios from "axios";
const LoginForm = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const onLoginSubmitHandler = (event) => {
    event.preventDefault();

    props.onAuth(login, password);
  };
  return (
    <StyledLoginForm onSubmit={onLoginSubmitHandler}>
      <LoginFormHeader>Zaloguj się</LoginFormHeader>
      <LoginInputs
        loginChangedHandler={setLogin}
        passwordChangedHandler={setPassword}
      />
      <LoginSubmitButton />
    </StyledLoginForm>
  );
};
const mapDispatchToProps = (dispatch) => ({
  onAuth: (login, password) => dispatch(actions.auth(login, password)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
