import React, { useState } from "react";
import LoginInputs from "./LoginInputs/LoginInputs";
import { StyledLoginForm } from "./StyledLoginForm";
import * as actions from "../../../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../../Spinner/Spinner";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import SubmitButton from "../../../SubmitButton/SubmitButton";
import { StyledFormHeader } from "../../../UI/Headers/StyledHeaders";

const LoginForm = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onLoginSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(login, password, props.onSuccess);
  };

  const error = props.error ? (
    <ErrorMessage errorMessage={props.error} />
  ) : null;
  return (
    <>
      <StyledLoginForm onSubmit={onLoginSubmitHandler}>
        <StyledFormHeader>Zaloguj się</StyledFormHeader>
        {error}
        <LoginInputs
          loginChangedHandler={setLogin}
          passwordChangedHandler={setPassword}
        />
        {props.isLoading ? (
          <Spinner centered />
        ) : (
          <SubmitButton title="Zaloguj się" />
        )}
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
