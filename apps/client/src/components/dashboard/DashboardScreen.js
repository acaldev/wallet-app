import React from "react";
import { useSelector } from "react-redux";
import { AccountList } from "./account/AccountList";
import { AccountAdd } from "./account/add/AccountAdd";
import { AccountDetail } from "./account/detail/AccountDetail";
import { AccountLayout } from "./account/detail/AccountLayout";
import { NoAccountSelected } from "./account/detail/NoAccountSelected";

export const DashboardScreen = () => {
  const { hasActive, account } = useSelector((state) => state.account);
  return (
    <>
      <div className="d-flex">
        <h3 className="text-primary-dark fw-bold">Accounts</h3>
        <AccountAdd />
      </div>
      <hr className="bg-primary-dark mt-4" />
      <AccountList />
      <AccountLayout>
        {!account || !hasActive ? (
          <NoAccountSelected />
        ) : (
          <AccountDetail {...account} />
        )}
      </AccountLayout>
    </>
  );
};
