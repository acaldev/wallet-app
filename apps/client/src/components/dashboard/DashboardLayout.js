import React from "react";
import { Navbar } from "./navbar/Navbar";

export const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="container mt-5">
        <div className="row">{children}</div>
      </div>
    </div>
  );
};
