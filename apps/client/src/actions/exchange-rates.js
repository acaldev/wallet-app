import api from "../helpers/api";
import { types } from "../types/types";
import { uIError } from "./ui";

export const getExchangeRates = () => {
  return async (dispatch) => {
    await api
      .get("/exchange-rate")
      .then(async ({ data: { data } }) => {
        await dispatch(setExchangeRates(data));
      })
      .catch(() => {
        uIError();
      });
  };
};

export const setExchangeRates = (rates) => ({
  type: types.exchangeRates,
  payload: rates,
});
