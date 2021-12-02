import api from "../helpers/api";
import { types } from "../types/types";
import { finishLoading, startLoading, uIError } from "./ui";

export const loadAccounts = (favorite = false) => {
  return async (dispatch) => {
    dispatch(startLoading("accounts"));
    await api
      .get("/wallet", favorite && { params: { favorite } })
      .then(async ({ data: { data } }) => {
        await dispatch(setAccounts(data));
        setTimeout(() => {
          dispatch(finishLoading("accounts"));
        }, 2000);
      })
      .catch(() => {
        uIError();
        dispatch(finishLoading("accounts"));
      });
  };
};

export const addAccount = (payload) => {
  return async (dispatch) => {
    dispatch(startLoading("account-add"));
    await api
      .post(`/wallet/`, payload)
      .then(async ({ data: { data } }) => {
        await dispatch(createdAccount(data));
        dispatch(finishLoading("account-add"));
      })
      .catch((e) => {
        uIError();
        dispatch(finishLoading("account-add"));
      });
  };
};

export const setAccounts = (accounts) => ({
  type: types.accountsLoad,
  payload: accounts,
});

export const createdAccount = (account) => ({
  type: types.addAccount,
  payload: account,
});
