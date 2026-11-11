import { Input } from "../components/Input";
import google from "./../assets/google.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SignupForm } from "../types/auth.types";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<SignupForm>();

  const { signupMutation } = useAuth();

  const onSubmit = (signupForm: SignupForm) => {
    signupMutation.mutate(signupForm, {
      onSuccess: () => {
        navigate("/login");
        reset();
      },
    });
  };

  return (
    <form
      className="w-[min(90vw,500px)] border border-gray-300 p-5 rounded flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-heading">Signup</h1>

      {signupMutation.error && (
        <div className="bg-red-200 border border-red-200 text-red-700 p-2 rounded">
          <p className="">
            {" "}
            {signupMutation.error?.response?.data?.message ||
              "Somehthing went wrong"}
          </p>
        </div>
      )}

      <Input
        label="Name"
        placeholder="John Doe"
        id="name"
        type="text"
        {...register("name", {
          required: "Name is required",
        })}
        error={errors.name?.message}
      />
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
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
            message:
              "Min 8 characters with uppercase, lowercase, a digit and a symbol",
          },
        })}
        error={errors.password?.message}
      />
      <Input
        label="Confirm Password"
        placeholder="********"
        id="confirmPassword"
        type="password"
        {...register("confirmPassword", {
          required: "Confirm password is required",
          validate: (confirmPassword) => {
            return (
              getValues("password") === confirmPassword ||
              "Passwords do not match"
            );
          },
        })}
        error={errors.confirmPassword?.message}
      />
      <button
        className="border w-full bg-black text-white rounded py-1.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={signupMutation.isPending}
      >
        {signupMutation.isPending ? "Signing up..." : "Signup"}
      </button>
      <button
        disabled={signupMutation.isPending}
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
        You already have an account?{" "}
        <Link to="/login" className="italic font-bold hover:underline ">
          Login
        </Link>
      </p>
    </form>
  );
};
