import axios from "axios";
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
      const result = response.data;
      dispatch(authSuccess(result));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};
