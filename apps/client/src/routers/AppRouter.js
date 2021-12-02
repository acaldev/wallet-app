import React from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

export const AppRouter = () => {
  const { authenticated } = useSelector((state) => state.auth);

  const routing = useRoutes(routes(authenticated));
  return <>{routing}</>;
};
