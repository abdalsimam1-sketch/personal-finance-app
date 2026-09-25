import logo from "../assets/images/logo-large.svg";
import authImage from "../assets/images/illustration-authentication.svg";
import { useState } from "react";
import { AuthInput } from "../components/AuthInput";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import * as authTypes from "../types/auth.types";
import google from "../assets/images/google.png";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";

const AUTH_MODES = {
  login: "LOGIN",
  signup: "SIGNUP",
};

export const Auth = () => {
  const navigate = useNavigate();
  const { loginMutation, signupMutation, resendVerificationEmailMutation } =
    useAuth();
  const isloading = loginMutation.isPending || signupMutation.isPending;
  const {
    register,
    reset,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<authTypes.SignupFormType>();
  const [authMode, setAuthMode] = useState(AUTH_MODES.login);
  const toggelAuthMode = () => {
    setAuthMode((prev) =>
      prev === AUTH_MODES.login ? AUTH_MODES.signup : AUTH_MODES.login,
    );
    reset();
  };
  const onSubmit = (authForm: authTypes.SignupFormType) => {
    if (authMode === AUTH_MODES.login) {
      loginMutation.mutate(
        {
          email: authForm.email,
          password: authForm.password,
        },
        {
          onSuccess: () => {
            navigate("/dashboard");
          },
        },
      );
    } else {
      signupMutation.mutate(authForm, {
        onSuccess: () => {
          setAuthMode(AUTH_MODES.login);
          reset();
        },
      });
    }
  };
  const loginError = loginMutation.error?.response?.data?.message;
  const signupError = signupMutation.error?.response?.data?.message;

  return (
    <div>
      <section className="p-5 flex justify-center bg-grey-900 lg:hidden rounded-b">
        <img src={logo} alt="mobile logo" />
      </section>
      <section className="flex  h-screen">
        <div className="w-1/3 p-5 h-screen hidden lg:block">
          <div
            className="auth-img hidden lg:flex lg:flex-col lg:justify-between  h-full w-full p-10 rounded-2xl"
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
            <h1 className="text-1">
              {authMode === AUTH_MODES.login ? "Login" : "Signup"}
            </h1>

            {/* login error */}
            {authMode === AUTH_MODES.login && loginMutation.isError && (
              <div
                className={`w-full px-3 h-15 bg-red-100 border border-red-200 flex items-center  rounded ${loginError === "User not verified" ? "justify-between" : "justify-center"}`}
              >
                <span className="text-captions text-red-700 font-bold ">
                  {loginError}
                </span>
                {loginError === "User not verified" && (
                  <button
                    onClick={() => {
                      resendVerificationEmailMutation.mutate(
                        getValues("email"),
                      );
                    }}
                    className="p-2 border border-red-400 text-red-600 bg-white  rounded text-captions cursor-pointer font-bold"
                    type="button"
                  >
                    Resend verification email
                  </button>
                )}
              </div>
            )}

            {/* signup error */}
            {authMode === AUTH_MODES.signup && signupMutation.isError && (
              <div className="w-full h-15 bg-red-100 border border-red-200 flex items-center justify-center rounded">
                {
                  <span className="text-captions text-red-00 font-bold ">
                    {signupError}
                  </span>
                }
              </div>
            )}

            {authMode === AUTH_MODES.signup && (
              <AuthInput
                label="Name"
                id="name"
                placeholder="John Doe"
                type="text"
                error={errors?.name?.message as string}
                {...register("name", {
                  required: "Name is required",
                })}
              />
            )}
            <div className="relative">
              <AuthInput
                label="Email"
                id="email"
                placeholder="johndoe@example.com"
                type="email"
                error={errors?.email?.message as string}
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {authMode === AUTH_MODES.login && (
                <span
                  className="text-captions underline text-gray-500 absolute right-0 cursor-pointer"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </span>
              )}
            </div>
            <AuthInput
              label="Password"
              id="password"
              placeholder="********"
              type="password"
              error={errors?.password?.message as string}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  message: "Choose a stronger password",
                },
              })}
            />
            {authMode === AUTH_MODES.signup && (
              <AuthInput
                label="Confirm Password"
                id="confirmPassword"
                placeholder="********"
                type="password"
                error={errors?.confirmPassword?.message as string}
                {...register("confirmPassword", {
                  required: "Confirming password is required",
                  validate: (value) => {
                    return (
                      value === getValues("password") || "Passwords don't match"
                    );
                  },
                })}
              />
            )}
            <button
              disabled={isloading}
              className={`py-2 text-white  rounded cursor-pointer min-h-50: ${isloading ? "bg-gray-400" : "bg-grey-900 "}`}
            >
              {isloading ? (
                <Spinner />
              ) : authMode === AUTH_MODES.login ? (
                "Login"
              ) : (
                "Signup"
              )}
            </button>
            <button
              disabled={isloading}
              onClick={() =>
                (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`)
              }
              type="button"
              className="bg-gray-100 flex justify-center rounded py-0.5 items-center cursor-pointer"
            >
              <img src={google} alt="google logo" className="w-15" />
              <p className="text-gray-500">Continue with Google</p>
            </button>
            <span className="text-gray-500 text-captions mx-auto">
              {authMode === AUTH_MODES.login ? (
                <span>
                  Don't have an account yet?{" "}
                  <span
                    className="underline text-black cursor-pointer font-bold"
                    onClick={toggelAuthMode}
                  >
                    SIGNUP
                  </span>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <span
                    className="underline text-black cursor-pointer font-bold"
                    onClick={toggelAuthMode}
                  >
                    LOGIN
                  </span>
                </span>
              )}
            </span>
          </form>
        </div>
      </section>
    </div>
  );
};
