import React from "react";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../../../../actions/account";
import { ExchangeRate } from "./exchange-rate/ExchangeRate";

export const AccountDetail = ({
  id,
  name,
  address,
  favorite,
  old,
  balance,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleFavorite(id));
  };

  return (
    <>
      {old && (
        <div className="alert alert-warning" role="alert">
          Wallet its old!
        </div>
      )}
      <h5>
        <i
          className={`bi-star${
            favorite ? "-fill" : ""
          } fav me-4 cursor-pointer`}
          title={`${favorite ? "Remove from" : "Add to"} Favorites`}
          onClick={handleClick}
        ></i>
        <strong>{name}</strong>{" "}
      </h5>
      <p className="mt-5">
        <strong>Address:</strong> {address}
      </p>
      <p>
        <strong>Balance ETH:</strong> {balance}
      </p>
      <ExchangeRate />
    </>
  );
};
