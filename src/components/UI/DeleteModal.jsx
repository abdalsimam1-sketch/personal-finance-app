import React from "react";
import { Button } from "./Button";
import { useFinance } from "../../context/FinanceContext";
export const DeleteModal = ({ category, onClose, variant }) => {
  const { deleteBudget } = useFinance();
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
          <h2 className="text-preset-2 ">
            Delete <span>"{category}"</span>
          </h2>
          <i className="bi bi-x-circle fs-2 btn" onClick={onClose}></i>
        </section>
        <p className="text-preset-4 text-muted">
          Are you sure want to delete this <span>{variant}</span> ? This action
          cannot be reversed, and all the data inside it will be removed forever
        </p>
        <Button
          variant="destroy"
          children="Yes,Confirm Deletion"
          onClick={() => {
            deleteBudget(category);
            onClose();
          }}
        ></Button>
        <span className="align-self-center mt-3 btn " onClick={onClose}>
          No,Go Back
        </span>
      </main>
    </div>
  );
};
