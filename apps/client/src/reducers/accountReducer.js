import { types } from "../types/types";

const initialState = { hasActive: false, account: undefined };

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.accountActive:
      return { ...state, ...{ account: action.payload, hasActive: true } };
    case types.removeAccountActive:
      return { ...state, ...{ account: false, hasActive: false } };
    case types.toggleFavorite:
      return {
        ...state,
        ...{
          account: {
            ...state.account,
            ...{ favorite: !state.account.favorite },
          },
        },
      };
    default:
      return state;
  }
};
