import { types } from "../types/types";

const initialState = [];

export const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addAccount:
      return [...state, ...[action.payload]];
    case types.accountsLoad:
      return [...action.payload];
    case types.toggleFavorite:
      return state.map((account) =>
        account.id !== action.payload
          ? account
          : { ...account, ...{ favorite: !account.favorite } }
      );
    default:
      return state;
  }
};
