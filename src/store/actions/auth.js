import { act } from "@testing-library/react";
import * as actionTypes from "./actionsTypes";

const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (login, password) => {
  return (dispatch) => {
    dispatch(authStart());
  };
};
