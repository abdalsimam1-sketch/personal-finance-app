import React from "react";
import { BudgetsAndPotsLabel } from "./BudgetsAndPotsLabel";
import { PercantageBar } from "./PercantageBar";
export const BudgetCard = ({ max }) => {
  return (
    <div className="card p-4 d-flex flex-column gap-3">
      <BudgetsAndPotsLabel
        label="Entertainment"
        color="var(--color-green)"
        variant="Budget"
      ></BudgetsAndPotsLabel>
      <span className="text-preset-5 text muted">Maximum of {max}</span>
      <PercantageBar percentage="90" color="var(--color-green)"></PercantageBar>
    </div>
  );
};
