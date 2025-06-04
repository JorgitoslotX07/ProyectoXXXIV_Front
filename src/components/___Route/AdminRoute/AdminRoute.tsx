import type { FC } from "react";
import { Navigate, type RouteProps } from "react-router-dom";
import { isAdminFromToken } from "../../../utils/cookisLogin";

export const AdminRoute: FC<RouteProps> = ({ children }) => {
    const token = localStorage.getItem("token");
    const isAdmin = isAdminFromToken(token);
  
    if (!token || !isAdmin) return <Navigate to="/" replace />;
    return children;
  };