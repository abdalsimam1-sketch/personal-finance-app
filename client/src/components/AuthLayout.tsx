import logo from "./../assets/logo-large.svg";
import authImage from "./../assets/illustration-authentication.svg";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <div className="w-1/2 p-5 h-screen hidden lg:block">
        <section
          className="auth-image-section  h-full rounded-2xl flex flex-col justify-between p-10 pl-10"
          style={{
            backgroundImage: `url(${authImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div className="text-white max-w-2xl">
            <h1 className="text-heading">
              Keep track of your money and save for your future
            </h1>
            <p className="">
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to savings pots easily.
            </p>
          </div>
        </section>
      </div>
      <div className="bg-grey-900 rounded-b lg:hidden flex justify-center items-center p-5">
        <img src={logo} alt="logo image" />
      </div>
      <section className="auth-form-section w-full lg:w-1/2 flex justify-center items-center flex-1">
        <Outlet></Outlet>
      </section>
    </div>
  );
};
