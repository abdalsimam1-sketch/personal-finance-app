import React, { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
export const AddWithdrawMoney = ({
  mode,
  onClose,
  pot,
  originalAmount,
  target,
}) => {
  const [inputAmount, setInputAmount] = useState("");
  const amount = Number(inputAmount) || 0;
  const newAmount =
    mode === "withdraw" ? originalAmount - amount : originalAmount + amount;
  const percentage = ((newAmount / target) * 100).toFixed(2);
  const amountToBeRendered = Math.max(newAmount, 0);
  const percentageToBerendered = Math.max(percentage, 0);
  return (
    <div
      className="position-fixed d-flex justify-content-center align-items-center h-100 w-100  start-0"
      style={{ background: "rgba(0,0,0,0.5)", zIndex: "1050", width: "100%" }}
    >
      <div className="card p-3" style={{ maxWidth: "500px", width: "90%" }}>
        <div className="d-flex align-items-center justify-content-between">
          {mode === "withdraw" ? (
            <h2 className="text-preset-2 md-text-preset-1">
              Withdraw from '{pot}'
            </h2>
          ) : (
            <h2 className="text-preset-2  md-text-preset-1">Add to '{pot}'</h2>
          )}
          <i className="bi bi-x-circle fs-4 btn" onClick={onClose}></i>
        </div>
        <div>
          <p className="text-preset-4 text-muted">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eos!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis,
            repellendus?
          </p>
        </div>
        <section>
          <div className="d-flex justify-content-between">
            <span className="text-preset-4">New Amount</span>
            <h1 className="text-preset-1">${amountToBeRendered}</h1>
          </div>
          <div
            className="card w-100  d-flex flex-row gap-1  "
            style={{ height: "12px" }}
          >
            <div
              className="bg-dark h-100 rounded-start"
              style={{ width: "1rem", flexShrink: 0 }}
            ></div>
            <div
              className={`h-100 rounded-end  ${percentageToBerendered === 0 ? "d-none" : ""}`}
              style={{
                width: `${percentage}% `,
                backgroundColor:
                  mode === "withdraw"
                    ? "var(--color-red)"
                    : "var(--color-green)",
                flexShrink: 1,
              }}
            ></div>
          </div>
          <div className="d-flex justify-content-between">
            <span
              className={`${mode === "withdraw" ? "text-danger" : "text-success"} text-preset-4 fw-bold`}
            >
              {percentageToBerendered}%
            </span>
            <span className="text-preset-4 text-muted">
              Target of ${target}
            </span>
          </div>
        </section>
        <Input
          label={mode === "withdraw" ? "Amount to withdraw" : "Amount to Add "}
          variant="prefix"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
        ></Input>
        <div className="mb-3"></div>
        <Button
          variant="primary"
          children={
            mode === "withdraw" ? "Confirm Withdrawal" : "Confirm Addition"
          }
        ></Button>
      </div>
    </div>
  );
};
