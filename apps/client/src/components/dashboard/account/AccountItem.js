import React from "react";
import { useDispatch } from "react-redux";
import { activeAccount } from "../../../actions/account";

export const AccountItem = (account) => {
  const { id, favorite, address, name } = account;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(activeAccount(id));
  };

  return (
    <div className="card wallet mb-3 cursor-pointer" onClick={handleClick}>
      <div className="card-body d-flex">
        <div className="w-icon bg-primary-light rounded-circle d-flex justify-content-center align-items-center">
          <i className="bi-wallet2 mb-1"></i>
        </div>
        <div className="d-flex flex-column mx-3">
          <h6 className="mb-0 fw-bold">{name}</h6>
          <p className="small mb-0">
            <small>{address}</small>
          </p>
        </div>
        <div className="ms-auto">
          <i className={`bi-star${favorite ? "-fill" : ""} fav ml-auto`}></i>
        </div>
      </div>
    </div>
  );
};
