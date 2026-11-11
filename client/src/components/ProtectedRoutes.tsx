import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { getMeQuery } = useAuth();

  const user = getMeQuery.data?.data;

  if (getMeQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="border animate-spin w-10 h-10 rounded-full border-t-transparent border-black"></span>
      </div>
    );
  } else if (!user) {
    return <Navigate to="/login" replace></Navigate>;
  } else {
    return children;
  }
};
