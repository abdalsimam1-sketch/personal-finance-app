import logo from "../assets/images/logo-large.svg";
import authImage from "../assets/images/illustration-authentication.svg";
import { AuthInput } from "../components/AuthInput";
import { Spinner } from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<{ email: string }>();
  const { forgotPasswordMutation } = useAuth();

  const onSubmit = (emailForm: { email: string }) => {
    console.log("email form", emailForm);
    forgotPasswordMutation.mutate(emailForm.email, {
      onSuccess: () => {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      },
    });
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
            <h1 className="text-1">Forgot Password</h1>
            <p className="text-gray-500 text-captions">
              Enter your email and we'll send you a link to reset your password.
            </p>

            <AuthInput
              {...register("email", {
                required: "Email is required",
              })}
              label="Email"
              id="email"
              placeholder="johndoe@example.com"
              type="email"
              error={errors.email?.message as string}
            />

            <button
              className={`py-2 text-white rounded cursor-pointer ${forgotPasswordMutation.isPending ? "bg-gray-400" : " bg-grey-900"}`}
            >
              {forgotPasswordMutation.isPending ? (
                <Spinner />
              ) : (
                "Send Reset Link"
              )}
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
