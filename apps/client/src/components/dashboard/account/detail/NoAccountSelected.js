import React from "react";
import { useSelector } from "react-redux";
import image from "../../../../images/no-selected-wallet.svg";
import { LoadingSpinner } from "../../shared/LoadingSpinner";

export const NoAccountSelected = () => {
  const { loading } = useSelector((state) => state.ui);
  const loadOn = ["account", "account-exchanges"];
  return (
    <>
      {loading && loadOn.includes(loading) ? (
        <LoadingSpinner itemClass="mt-5" />
      ) : (
        <>
          <h3 className="text-center text-primary mt-5">Select an Account</h3>
          <img src={image} className="mt-5 mx-5" alt="select a wallet" />
        </>
      )}
    </>
  );
};
