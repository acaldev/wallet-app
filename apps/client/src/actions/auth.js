import Swal from "sweetalert2";
import api from "../helpers/api";
import AuthService from "../helpers/auth.service";
import { types } from "../types/types";
import { loadAccounts } from "./accounts";
import { finishLoading, startLoading, uIError } from "./ui";
export const startLogin = (username, password) => {
  return (dispatch) => {
    dispatch(startLoading("login"));
    api
      .post("/login", { username, password })
      .then(({ data }) => {
        AuthService.set(data);
        dispatch(login(data));
        dispatch(loadAccounts());
        dispatch(finishLoading("login"));
      })
      .catch(() => {
        uIError();
        dispatch(finishLoading("login"));
      });
  };
};

export const startRegister = (
  username,
  email,
  password,
  firstName,
  lastName
) => {
  return (dispatch) => {
    dispatch(startLoading("register"));
    api
      .post("/register", { username, email, password, firstName, lastName })
      .then(() => {
        Swal.fire(
          "Registration Success",
          "Please login now with your credentials",
          "success"
        );
        dispatch(finishLoading("register"));
      })
      .catch(() => {
        uIError();
        dispatch(finishLoading("register"));
      });
  };
};

export const doLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

export const login = (payload) => ({
  type: types.login,
  payload: payload,
});

export const logout = () => ({
  type: types.logout,
});
