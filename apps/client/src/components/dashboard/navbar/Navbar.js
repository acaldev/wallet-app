import React from "react";
import { useDispatch } from "react-redux";
import { doLogout } from "../../../actions/auth";

export const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(doLogout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary-dark  justify-content-between">
      <div className="container">
        <a className="navbar-brand" href="/">
          App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <button
          className="btn btn-outline-primary logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};
