import { useAuth } from "../hooks/useAuth";
import React from "react";
import { Spinner } from "./Spinner";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { getMeQuery } = useAuth();

  const { isError, isLoading } = getMeQuery;

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  if (isError) {
    return <Navigate to="/" replace />;
  }
  return children;
};
