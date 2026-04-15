import React, { useState } from "react";
import authImage from "../assets/images/illustration-authentication.svg";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
export const LoginPage = () => {
  const [mode, setMode] = useState("Login");
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
        <form action="" className="w-100">
          <div
            className="card p-3 d-flex flex-column gap-3 mx-auto m-lg-0 "
            style={{ maxWidth: "500px", width: "90%" }}
          >
            <h1 className="text-preset-1">{mode}</h1>
            <Input label="Email" type="email"></Input>
            <Input label="Password" type="password"></Input>
            {mode !== "Login" && (
              <Input
                label="Confirm Password"
                type="password"
                helper="Password must be at least 8 characters"
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
