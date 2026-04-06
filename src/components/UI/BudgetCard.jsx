import React from "react";
import { BudgetsAndPotsLabel } from "./BudgetsAndPotsLabel";
import { PercantageBar } from "./PercantageBar";
export const BudgetCard = ({ maximum, category, theme, percentage }) => {
  return (
    <div className="card p-4 d-flex flex-column gap-3">
      <BudgetsAndPotsLabel
        label={category}
        color={theme}
        variant="Budget"
      ></BudgetsAndPotsLabel>
      <span className="text-preset-5 text muted">Maximum of {maximum}</span>
      <PercantageBar percentage={percentage} color={theme}></PercantageBar>
      <div className="row row-cols-2">
        <div>
          <span style={{ width: "4px", height: "2.5rem", color: theme }}></span>
          <div className="d-flex flex-column">
            <span className="text-preset-5 text-muted">Spent</span>
            <span className="fw-bold text-preset-4">$</span>
          </div>
        </div>
        <div>
          <span style={{ width: "4px", height: "2.5rem", color: theme }}></span>
          <div className="d-flex flex-column">
            <span className="text-preset-5 text-muted">Remaining</span>
            <span className="fw-bold text-preset-4">$</span>
          </div>
        </div>
      </div>
    </div>
  );
};
