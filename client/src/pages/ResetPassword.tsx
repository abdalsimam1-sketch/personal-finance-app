import { Input } from "../components/Input";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import type { ResetPasswordForm } from "../types/auth.types";
import { Link } from "react-router-dom";

export const ResetPassword = () => {
  const { token } = useParams();
  const { resetPasswordMutation } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  const onSubmit = (resetPasswordForm: ResetPasswordForm) => {
    if (!token) {
      return;
    }
    resetPasswordMutation.mutate(
      {
        token,
        payload: {
          newPassword: resetPasswordForm.newPassword,
          confirmNewPassword: resetPasswordForm.confirmNewPassword,
        },
      },
      {
        onSuccess: () => {},
      },
    );
  };

  if (!token) {
    return (
      <div className="w-[min(95vw,500px)] border border-gray-300 rounded p-5 flex flex-col gap-5">
        <h1 className="text-heading">Invalid link</h1>
        <p>This reset link is invalid or incomplete. Request a new one.</p>
        <Link className="underline text-gray-700" to="/forgot-password">
          Request a new link
        </Link>
      </div>
    );
  }

  if (resetPasswordMutation.isSuccess) {
    return (
      <div className="w-[min(95vw,500px)] border border-gray-300 rounded p-5 flex flex-col gap-5">
        <h1 className="text-heading">Password reset</h1>
        <p>Your password has been updated. You can close this tab now.</p>
        <Link
          className="py-1 bg-black w-full rounded text-white text-center"
          to="/login"
        >
          Go to login
        </Link>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[min(95vw,500px)] border border-gray-300 rounded p-5 flex flex-col gap-5"
    >
      <h1 className="text-heading">Reset Password</h1>
      <p>Enter a new password for your account</p>
      <Input
        id="newPassword"
        placeholder="Enter your new password here"
        label="New Password"
        {...register("newPassword", {
          required: "Password is required",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
            message:
              "Min 8 characters with uppercase, lowercase, a digit and a symbol",
          },
        })}
        type="password"
        error={errors.newPassword?.message}
      />
      <Input
        id="newConfirmPassword"
        placeholder="Confirm New Password"
        label="Confirm New Password"
        {...register("confirmNewPassword", {
          required: "Confirming new password is required",
          validate: (confirmNewPassword: string) => {
            return (
              getValues("newPassword") === confirmNewPassword ||
              "Passwords do not match"
            );
          },
        })}
        type="password"
        error={errors.confirmNewPassword?.message}
      />
      <button
        className="py-1 bg-black w-full rounded text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={resetPasswordMutation.isPending}
      >
        {resetPasswordMutation.isPending ? "Submitting..." : "Submit"}{" "}
      </button>
      <Link
        className="self-end italic text-captions text-gray-700  underline"
        to="/login"
      >
        Back to Login
      </Link>
    </form>
  );
};
