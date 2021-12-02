import React from "react";
import { ParticleScreen } from "./ParticleScreen";

export const AuthLayout = ({ children }) => {
  return (
    <div className="auth position-relative">
      <ParticleScreen />
      <div className="container d-flex h-100 align-items-center justify-content-center">
        <div className="card rounded-3 border-0 auth-card">
          <div className="card-body ps-0 py-0">
            <div className="row g-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
