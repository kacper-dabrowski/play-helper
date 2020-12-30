import axios from "axios";
import * as actionTypes from "./actionsTypes";

const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

const authSuccess = (token, userId, fullName) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
    fullName,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkTimeout = (expirationTime) => {
  return (dispatch) =>
    setTimeout(() => {
      dispatch(logout());
    }, Number(expirationTime * 1000));
};

export const auth = (login, password, onSuccess) => {
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const authData = { username: login, password };
      const response = await axios.post(
        "http://localhost:3001/login",
        authData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token: idToken, userId, fullName } = response.data;
      if (!idToken || !userId) {
        throw new Error("Unable to authenticate");
      }

      dispatch(authSuccess(idToken, userId, fullName));
      dispatch(checkTimeout(response.data.expiresIn));

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.warn(error.response);
      dispatch(authFail(error.response.data.details));
    }
  };
};
