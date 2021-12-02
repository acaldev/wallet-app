import { types } from "../types/types";

const initialState = [];

export const exchangeRatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.exchangeRates:
      return [...action.payload];
    default:
      return state;
  }
};
