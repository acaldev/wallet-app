import { types } from "../types/types";

const initialState = {
  authenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login:
      return { ...action.payload, ...{ authenticated: true } };
    case types.logout:
      return { authenticated: false };
    default:
      return state;
  }
};
