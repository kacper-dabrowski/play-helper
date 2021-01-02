import React, { useState } from "react";
import LoginFormHeader from "./LoginFormHeader/LoginFormHeader";
import LoginInputs from "./LoginInputs/LoginInputs";
import LoginSubmitButton from "./LoginSubmitButton/LoginSubmitButton";
import { StyledLoginForm } from "./StyledLoginForm";
import * as actions from "../../../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../../Spinner/Spinner";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const LoginForm = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onLoginSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(login, password, props.onSuccess);
  };

  const error = (
    <ErrorMessage errorMessage={props.error ? props.error : null} />
  );
  return (
    <>
      <StyledLoginForm onSubmit={onLoginSubmitHandler}>
        <LoginFormHeader>Zaloguj się</LoginFormHeader>
        {error}
        <LoginInputs
          loginChangedHandler={setLogin}
          passwordChangedHandler={setPassword}
        />
        {props.isLoading ? <Spinner centered /> : <LoginSubmitButton />}
      </StyledLoginForm>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  onAuth: (login, password, onSuccess) =>
    dispatch(actions.auth(login, password, onSuccess)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
