import React from "react";
import { Button } from "../UI/Button";
import { BudgetsAndPotsLabel } from "../UI/BudgetsAndPotsLabel";
export const PotsCard = ({ total, color, percentage, target, label }) => {
  return (
    <div className="card p-4 col-11 mx-auto d-flex flex-column gap-3">
      <section>
        {" "}
        <BudgetsAndPotsLabel
          variant="Pot"
          label={label}
          color={color}
        ></BudgetsAndPotsLabel>
      </section>
      <section className="d-flex justify-content-between align-items-center ">
        <span className="text-preset-4 text-muted">Total Saved</span>
        <h1 className="text-preset-1">${total}</h1>
      </section>
      <section
        className="percentage-section card w-100"
        style={{ height: "10px", backgroundColor: "var(--color-beige-100)" }}
      >
        <div
          className="rounded"
          style={{
            height: "100%",
            backgroundColor: "var(--color-green)",
            width: `{${percentage}%`,
          }}
        ></div>
      </section>
      <section className="text-preset-5 text-muted d-flex justify-content-between align-items-center">
        <span>{percentage}</span>
        <span>Target of {target}</span>
      </section>
      <section className="d-flex justify-content-between">
        <Button variant="secondary">+ Add Money</Button>
        <Button variant="secondary">Withdraw</Button>
      </section>
    </div>
  );
};
