import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import { ChallengeMessage } from "./ChallengeMessage";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    username: "admin",
    password: "admin",
  });

  const { username, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(username, password));
  };

  return (
    <>
      <div className="col-6 d-none d-sm-block rounded-start px-5 py-5 auth-left-panel">
        <h2 className="text-light fw-bold">Login</h2>
        <ChallengeMessage />
      </div>
      <div className="col col-sm-6 px-5 py-5">
        <form onSubmit={handleLogin}>
          <div className="row">
            <div className="col-auto mx-auto">
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  className="form-control"
                  autoComplete="off"
                  value={username}
                  onChange={handleInputChange}
                />
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
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  Login
                </button>
                <Link className="link" to="/auth/register">
                  Create new account
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
