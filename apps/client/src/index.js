import React from "react";
import ReactDOM from "react-dom";
import { loadAccounts } from "./actions/accounts";
import { App } from "./App";
import AuthService from "./helpers/auth.service";
import { store } from "./store/store";
import "./styles/styles.scss";
import { types } from "./types/types";

const storageApp = AuthService.get();
if (storageApp) {
  store.dispatch({
    type: types.login,
    payload: storageApp,
  });
  store.dispatch(loadAccounts());
}

ReactDOM.render(<App />, document.getElementById("root"));
