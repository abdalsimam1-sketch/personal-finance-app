import React from "react";
import { Button } from "./Button";
export const DeleteBudget = ({ category, onClose }) => {
  return (
    <div
      className="position-fixed  top-0 start-0 d-flex justify-content-center align-items-center h-100 h-100 "
      style={{
        background: "rgba(0,0,0,0.5)",
        width: "100%",
        zIndex: "1050",
      }}
    >
      <main className="card p-4" style={{ maxWidth: "500px", width: "90%" }}>
        <section className="d-flex align-items-center justify-content-between">
          <h1 className="text-preset-1">
            Delete <span></span>
          </h1>
          <i className="bi bi-x-circle fs-2 btn" onClick={onClose}></i>
        </section>
        <p className="text-preset-4 text-muted">
          Are you sure want to delete this budget ? This action cannot be
          reversed, and all the data inside it will be removed forever
        </p>
        <Button variant="destroy" children="Yes,Confirm Deletion"></Button>
        <span className="align-self-center mt-3 btn " onClick={onClose}>
          No,Go Back
        </span>
      </main>
    </div>
  );
};
