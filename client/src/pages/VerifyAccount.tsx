import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export const VerifyAccount = () => {
  const { token } = useParams();
  const { verifyAccountMutation } = useAuth();

  useEffect(() => {
    if (token) {
      verifyAccountMutation.mutate(token);
    }
  }, []);

  if (verifyAccountMutation.isIdle || verifyAccountMutation.isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <p className="text-gray-600">Verifying your account...</p>
      </div>
    );
  }
  if (verifyAccountMutation.isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-sm text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Account verified
          </h1>
          <p className="mt-3 rounded-md border border-green-300 bg-green-100 p-3 font-medium text-green-800">
            You can close this tab now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-sm text-center">
        <h1 className="text-xl font-semibold text-gray-900">
          Verification failed
        </h1>
        <p className="mt-3 rounded-md border border-red-300 bg-red-100 p-3 font-medium text-red-800">
          {verifyAccountMutation.error?.response?.data?.message ??
            "Something went wrong"}
        </p>
      </div>
    </div>
  );
};
