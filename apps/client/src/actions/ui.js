import Swal from "sweetalert2";
import { types } from "../types/types";

export const setError = (err) => ({
  type: types.uiSetError,
  payload: err,
});

export const removeError = () => ({
  type: types.uiRemoveError,
});

export const startLoading = (payload) => ({
  type: types.uiStartLoading,
  payload,
});

export const finishLoading = (payload) => ({
  type: types.uiFinishLoading,
  payload,
});

export const uIError = () => Swal.fire("Error", "Ups unknow error", "error");
