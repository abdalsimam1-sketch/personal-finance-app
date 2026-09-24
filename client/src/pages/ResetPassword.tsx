import logo from "../assets/images/logo-large.svg";
import authImage from "../assets/images/illustration-authentication.svg";
import { AuthInput } from "../components/AuthInput";
import { Spinner } from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();
  const { resetPasswordMutation } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<{ newPassword: string; confirmNewPassword: string }>();

  const onSubmit = (resetPasswordForm: {
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    if (token) {
      resetPasswordMutation.mutate({ token, ...resetPasswordForm });
    }
  };

  return (
    <div>
      <section className="p-5 flex justify-center bg-grey-900 lg:hidden rounded-b">
        <img src={logo} alt="mobile logo" />
      </section>
      <section className="flex h-screen">
        <div className="w-1/3 p-5 h-screen hidden lg:block">
          <div
            className="auth-img hidden lg:flex lg:flex-col lg:justify-between h-full w-full p-10 rounded-2xl"
            style={{
              backgroundImage: `url(${authImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img src={logo} alt="desktop logo" className="w-50" />
            <div className="text-white lg:max-w-lg">
              <h1 className="text-1 ">
                Keep track of your money and save for your future
              </h1>
              <p>
                Personal finance app puts you in control of your spending. Track
                transactions, set budgets, and add to savings pots easily.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-2/3 flex justify-center items-center w-full">
          <form
            className="w-[min(550px,90vw)] mx-auto bg-white rounded-2xl p-5 flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-1">Reset Password</h1>
            <p className="text-gray-500 text-captions">
              Enter your new password below.
            </p>

            {resetPasswordMutation.isSuccess && (
              <span className="w-full px-3 h-15 bg-green-100 border border-green-200 flex items-center justify-center  rounded text-captions text-bold text-green-700">
                <span className="text-center">
                  Password reset. Close this tab!
                </span>
              </span>
            )}

            <AuthInput
              label="New Password"
              id="newPassword"
              placeholder="********"
              type="password"
              {...register("newPassword", {
                required: "New Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  message: "Choose a stronger password",
                },
              })}
              error={errors.newPassword?.message}
            />

            <AuthInput
              label="Confirm New Password"
              id="confirmNewPassword"
              placeholder="********"
              type="password"
              {...register("confirmNewPassword", {
                required: "Confirm password",
                validate: (value) => {
                  return (
                    value === getValues("newPassword") ||
                    "Passwords don't match"
                  );
                },
              })}
              error={errors.confirmNewPassword?.message}
            />

            <button
              className={`py-2 text-white rounded cursor-pointer ${resetPasswordMutation.isPending ? "bg-grey-400" : " bg-grey-900"}`}
            >
              {resetPasswordMutation.isPending ? <Spinner /> : "Reset Password"}
            </button>

            <span className="text-gray-500 text-captions mx-auto">
              Remembered your password?{" "}
              <span
                className="underline text-black cursor-pointer font-bold"
                onClick={() => navigate("/")}
              >
                LOGIN
              </span>
            </span>
          </form>
        </div>
      </section>
    </div>
  );
};
