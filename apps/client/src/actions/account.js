import api from "../helpers/api";
import { types } from "../types/types";
import { getExchangeRates } from "./exchange-rates";
import { finishLoading, startLoading, uIError } from "./ui";

export const activeAccount = (id) => {
  return async (dispatch) => {
    dispatch(startLoading("account"));
    await dispatch(getExchangeRates());
    await api
      .get(`/wallet/${id}`)
      .then(async ({ data: { data } }) => {
        dispatch(setAccount(data));
        dispatch(finishLoading("account"));
      })
      .catch((e) => {
        uIError();
        dispatch(finishLoading("account"));
      });
  };
};

export const toggleFavorite = (id) => {
  return async (dispatch) => {
    dispatch(startLoading("account"));
    await api
      .put(`/wallet/${id}/favorite`)
      .then(async () => {
        await dispatch(setToggleFavorite(id));
        dispatch(finishLoading("account"));
      })
      .catch((e) => {
        console.log(e);
        uIError();
        dispatch(finishLoading("account"));
      });
  };
};

export const setAccount = (account) => ({
  type: types.accountActive,
  payload: account,
});

export const removeAccount = () => ({
  type: types.removeAccountActive,
});

export const setToggleFavorite = (id) => ({
  type: types.toggleFavorite,
  payload: id,
});
