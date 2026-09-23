import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../components/Spinner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const VerifyEmail = () => {
  const { token } = useParams();

  const { verifyEmailMutation } = useAuth();
  const verificationMessage = verifyEmailMutation.data?.message;

  useEffect(() => {
    if (token) {
      verifyEmailMutation.mutate(token);
    }
  }, [token]);

  if (!token) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="max-w-md px-3 h-15 bg-red-100 border border-red-200 flex items-center  rounded text-captions text-bold text-red-700 ">
          Invalid or expired tokens
        </span>
      </div>
    );
  }

  if (verifyEmailMutation.isPending || verifyEmailMutation.isIdle) {
    return <Spinner />;
  }
  if (verifyEmailMutation.isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="max-w-md px-3 h-15 bg-red-100 border border-red-200 flex items-center  rounded text-captions text-bold text-red-700 ">
          {verifyEmailMutation.error?.response?.data?.message}
        </span>
      </div>
    );
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <span className="max-w--md px-3 h-15 bg-green-100 border border-green-200 flex items-center  rounded text-captions text-bold text-green-700 ">
        {verificationMessage}. <span>Close this tab!</span>
      </span>
    </div>
  );
};
