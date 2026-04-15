import React, { useState, useEffect } from "react";
import authImage from "../assets/images/illustration-authentication.svg";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { supabase } from "../HelperFunctions/supabaseClient";
export const LoginPage = () => {
  const [mode, setMode] = useState("Login");
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
    //supabase conditionals
    if (mode === "Login") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });
      if (error) {
        setEmailError(error.message);
      } else {
        console.log("Logged in", data.user);
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
      }
    }
  };
  return (
    <div className="d-flex">
      <section className="d-none d-lg-block col-lg-6 p-3">
        <img
          src={authImage}
          alt="auth image"
          style={{ maxHeight: "95vh" }}
          className="rounded"
        />
      </section>
      <section
        className="col-12  col-lg-6 d-flex  align-items-center "
        style={{ height: "100vh" }}
      >
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
      </section>
    </div>
  );
};
