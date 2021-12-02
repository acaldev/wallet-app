import { Navigate, Outlet } from "react-router-dom";
import { AuthLayout } from "../components/auth/AuthLayout";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { DashboardScreen } from "../components/dashboard/DashboardScreen";

const routes = (isLoggedIn) => [
  {
    path: "/",
    element: isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />,
    children: [{ path: "", element: <Navigate to="/auth/login" /> }],
  },
  {
    path: "/app",
    element: isLoggedIn ? (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ) : (
      <Navigate to="/auth/login" />
    ),
    children: [
      { path: "dashboard", element: <DashboardScreen /> },
      { path: "", element: <Navigate to="/app/dashboard" /> },
    ],
  },
  {
    path: "/auth",
    element: !isLoggedIn ? (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ) : (
      <Navigate to="/app/dashboard" />
    ),
    children: [
      { path: "login", element: <LoginScreen />, layout: <AuthLayout /> },
      { path: "register", element: <RegisterScreen /> },
      { path: "", element: <Navigate to="/auth/login" /> },
    ],
  },
];

export default routes;
