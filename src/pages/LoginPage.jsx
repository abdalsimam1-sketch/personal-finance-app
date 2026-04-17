import React, { useState, useEffect } from "react";
import authImage from "../assets/images/illustration-authentication.svg";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { supabase } from "../HelperFunctions/supabaseClient";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-large.svg";
export const LoginPage = () => {
  const Navigate = useNavigate();
  const [mode, setMode] = useState("Login");
  const [isLoading, setIsLoading] = useState(false);
  const defaultForm = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginForm, setLoginForm] = useState(defaultForm);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPassWordError] = useState("");
  const [confirmPasswordError, setConfirmErrorPassword] = useState("");
  const handleSubmit = async () => {
    //clearing error states after every submssion
    setEmailError("");
    setPassWordError("");
    setConfirmErrorPassword("");
    //validation conditionals
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    let hasError = false;
    if (loginForm.email.length === 0) {
      setEmailError("Email is required");
      hasError = true;
    }
    if (!emailRegex.test(loginForm.email)) {
      setEmailError("Please enter a valid email");
      hasError = true;
    }
    if (loginForm.password.length === 0) {
      setPassWordError("Password is required");
      hasError = true;
    }
    if (!passwordRegex.test(loginForm.password)) {
      setPassWordError("Please set a valid password");
      hasError = true;
    }
    if (mode === "Signup" && loginForm.password !== loginForm.confirmPassword) {
      setConfirmErrorPassword("Passwords do no match");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);

    //supabase conditionals
    if (mode === "Login") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });
      if (error) {
        setEmailError(error.message);
      } else {
        console.log("Logged In", data.user);
        Navigate("/app");
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: loginForm.email,
        password: loginForm.password,
      });
      if (error) {
        setEmailError(error.message);
      } else {
        console.log("Signed up", data.user);
        Navigate("/app");
      }
    }
    setIsLoading(false);
  };
  return (
    <div
      className="d-flex position-relative p-lg-3"
      style={{ overflow: "hidden", maxHeight: "100vh" }}
    >
      <section
        className="d-none d-lg-flex col-lg-4 rounded align-items-end p-4 shadow"
        style={{
          backgroundImage: `url(${authImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <div className="text-light">
          <h1 className="text-preset-1">
            Keep track of your money and save for your future
          </h1>
          <h3 className="text-preset-3">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily
          </h3>
        </div>
      </section>
      <section
        className="col-12 col-lg-6 d-flex  align-items-center justify-content-center container"
        style={{ height: "100vh" }}
      >
        {!isLoading ? (
          <form
            key={mode}
            className="w-100"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div
              className="card p-3 d-flex flex-column gap-3 mx-auto m-lg-0 "
              style={{ maxWidth: "500px", width: "90%" }}
            >
              <h1 className="text-preset-1">{mode}</h1>
              <Input
                label="Email"
                type="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((current) => ({
                    ...current,
                    email: e.target.value,
                  }))
                }
                error={emailError}
              ></Input>
              <Input
                label="Password"
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((current) => ({
                    ...current,
                    password: e.target.value,
                  }))
                }
                error={passwordError}
              ></Input>
              {mode !== "Login" && (
                <Input
                  label="Confirm Password"
                  type="password"
                  helper="Password must be at least 8 characters"
                  value={loginForm.confirmPassword}
                  onChange={(e) =>
                    setLoginForm((current) => ({
                      ...current,
                      confirmPassword: e.target.value,
                    }))
                  }
                  error={confirmPasswordError}
                ></Input>
              )}
              <Button
                children={mode === "Login" ? "Login" : "Signup"}
                variant="primary"
              ></Button>
              <div className="mx-auto">
                <span>
                  {mode === "Login"
                    ? "Need to create an account ? "
                    : "Already have an account ? "}
                  <span
                    className="border-bottom border-dark"
                    style={{ border: "black", cursor: "pointer" }}
                    onClick={() => {
                      mode === "Login" ? setMode("Signup") : setMode("Login");
                      setLoginForm(defaultForm);
                      setEmailError("");
                      setPassWordError("");
                      setConfirmErrorPassword("");
                    }}
                  >
                    {mode === "Login" ? "Signup" : "Login"}
                  </span>
                </span>
              </div>
            </div>
          </form>
        ) : (
          <div className="col-12 d-flex justify-content-center">
            {" "}
            <span
              className="spinner-border"
              role="status"
              style={{ width: "7rem", height: "7rem" }}
            />
          </div>
        )}
      </section>
      <div className="w-100 d-lg-none d-flex justify-content-center p-3 position-absolute top-0 bg-dark rounded-bottom">
        <img src={logo} alt="login logo" />
      </div>
    </div>
  );
};
