import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { accountReducer } from "../reducers/accountReducer";
import { accountsReducer } from "../reducers/accountsReducer";
import { authReducer } from "../reducers/authReducer";
import { exchangeRatesReducer } from "../reducers/exchangeRatesReducer";
import { uiReducer } from "../reducers/uiReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  accounts: accountsReducer,
  account: accountReducer,
  exchangeRates: exchangeRatesReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
