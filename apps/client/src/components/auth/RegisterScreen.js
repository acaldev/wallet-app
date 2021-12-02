import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { setError, removeError } from "../../actions/ui";
import { startRegister } from "../../actions/auth";
import { ChallengeMessage } from './ChallengeMessage';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, firstName, lastName, email, password, password2 } =
    formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegister(username, email, password, firstName, lastName));
    }
  };

  const isFormValid = () => {
    if (validator.isEmpty(username)) {
      dispatch(setError("Username is required"));
      return false;
    } else if (validator.isEmpty(email)) {
      dispatch(setError("Email is required"));
      return false;
    } else if (validator.isEmpty(firstName)) {
      dispatch(setError("First name is required"));
      return false;
    } else if (validator.isEmpty(lastName)) {
      dispatch(setError("Last name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (password !== password2 || password.lenth < 5) {
      dispatch(setError("Password should be at least 6 characters and match"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <div className="col-6 d-none d-sm-block rounded-start px-5 py-5 auth-left-panel">
        <h2 className="text-light fw-bold">Register</h2>
        <ChallengeMessage />
      </div>
      <div className="col col-sm-6 px-5 py-5">
        <form onSubmit={handleRegister}>
          {msgError && <div className="alert alert-warning">{msgError}</div>}
          <div className="row">
            <div className="col-auto mx-auto">
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  className="form-control"
                  value={username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="form-control"
                  autoComplete="off"
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-flex flex-row">
                <div className="mb-3 pe-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Retipe Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  className="form-control"
                  value={password2}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-block mb-5">
              Register
            </button>
            <Link className="link" to="/auth/login">
              Already registered?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
