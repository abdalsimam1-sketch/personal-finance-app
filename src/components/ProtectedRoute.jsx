import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export const ProtectedRoute = () => {
  const { loading, session } = useAuth();

  if (loading) {
    return <span className="spinner-border" role="status"></span>;
  }
  if (!session) {
    return <Navigate to="/login"></Navigate>;
  }
  return <Outlet></Outlet>;
};
