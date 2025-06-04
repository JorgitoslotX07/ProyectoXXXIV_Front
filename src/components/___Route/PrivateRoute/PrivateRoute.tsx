import { Navigate, type RouteProps } from "react-router-dom";
import type { FC } from "react";
import { getCookiesLogin } from "../../../utils/cookisLogin";


export const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const token = getCookiesLogin()
  return token ? children : <Navigate to="/" />;
};

