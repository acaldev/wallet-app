import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAccounts } from "../../../actions/accounts";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { AccountItem } from "./AccountItem";

export const AccountList = () => {
  const accounts = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const checked = e.target.checked;
    dispatch(loadAccounts(checked));
  };

  return (
    <div className="col-4 mt-2 account-list scrollbar">
      <div className="form-check form-switch mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          name="favorites"
          onClick={handleClick}
        />
        <label className="form-check-label text-primary-dark">
          Order by Favorites
        </label>
      </div>
      {accounts && accounts.length ? (
        accounts.map((account) => <AccountItem key={account.id} {...account} />)
      ) : (
        <LoadingSpinner itemClass="mt-5" />
      )}
    </div>
  );
};
