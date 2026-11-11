import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export const ForgotPassword = () => {
  const { forgotPasswordMutation } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string }>();

  const onSubmit = (emailForm: { email: string }) => {
    forgotPasswordMutation.mutate(emailForm.email, {
      onSuccess: () => {
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[min(95vw,500px)] border border-gray-300 rounded p-5 flex flex-col gap-5"
    >
      <h1 className="text-heading">Forgot Password</h1>
      <p className="text-gray-500 text-captions">
        Please enter your email here to get a password reset email
      </p>
      <Input
        type="email"
        placeholder="johndoe@gmail.com"
        id="email"
        label="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        })}
        error={errors.email?.message}
      />
      <button
        className="py-1 bg-black w-full rounded text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={forgotPasswordMutation.isPending}
      >
        {forgotPasswordMutation.isPending ? "Submitting..." : "Submit"}{" "}
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
