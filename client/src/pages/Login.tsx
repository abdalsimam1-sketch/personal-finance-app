import { Input } from "../components/Input";
import google from "./../assets/google.png";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import type { LoginForm } from "../types/auth.types";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const { loginMutation, resendVerificationEmailMutation } = useAuth();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
  } = useForm<LoginForm>();

  const onSubmit = (loginForm: LoginForm) => {
    loginMutation.mutate(loginForm, {
      onSuccess: () => {
        navigate("/overview");
        reset();
      },
    });
  };

  return (
    <form
      className="w-[min(90vw,500px)] border border-gray-300 p-5 rounded flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-heading">Login</h1>

      {loginMutation.error && (
        <div className="bg-red-200 border border-white text-red-700 p-2 rounded flex items-center justify-between">
          <p>
            {loginMutation.error?.response?.data?.message ||
              "Something went wrong"}
          </p>
          {loginMutation.error?.response?.data?.message ===
            "Verify Account" && (
            <button
              onClick={() => {
                resendVerificationEmailMutation.mutate(getValues("email"));
              }}
              className="bg-white  text-red p-2 rounded text-captions cursor-pointer"
              type="button"
            >
              Resend verification email
            </button>
          )}
        </div>
      )}

      <Input
        label="Email"
        placeholder="johndoe@example.com"
        id="email"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        })}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        placeholder="********"
        id="password"
        type="password"
        {...register("password", {
          required: "Password is required",
        })}
        error={errors.password?.message}
      />
      <Link
        className="self-end italic text-captions text-gray-700  underline"
        to="/forgot-password"
      >
        Forgot Password
      </Link>

      <button
        className="border w-full bg-black text-white rounded py-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>
      <button
        className="border border-gray-300 w-full bg-white flex items-center py-1.5 justify-center  gap-3 rounded cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        type="button"
        onClick={() => {
          window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
        }}
      >
        <img src={google} alt="google logo" className="w-5" />
        <p> Continue with Google</p>
      </button>
      <p className="text-captions text-gray-500 text-center">
        Don't have an account yet?{" "}
        <Link to="/signup" className="italic font-bold hover:underline">
          Signup
        </Link>
      </p>
    </form>
  );
};
