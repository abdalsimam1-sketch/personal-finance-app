import React from "react";
import { BudgetsAndPotsLabel } from "./BudgetsAndPotsLabel";
import { PercantageBar } from "./PercantageBar";
import { FormatDate } from "../../HelperFunctions/DateFormat";
import { SeeDetails } from "../../components/UI/SeeDetails";
export const BudgetCard = ({
  maximum,
  category,
  theme,
  percentage,
  latest3 = [],
  spent = [],
  remaining = [],
  onEdit,
  onDelete,
}) => {
  const path = "/transactions";
  return (
    <div className="card p-4 d-flex flex-column gap-3">
      <BudgetsAndPotsLabel
        label={category}
        color={theme}
        variant="Budget"
        onEdit={onEdit}
        onDelete={onDelete}
      ></BudgetsAndPotsLabel>
      <span className="text-preset-5 text muted">Maximum of {maximum}</span>
      <PercantageBar percentage={percentage} color={theme}></PercantageBar>
      <div className="row row-cols-2">
        <div className="d-flex gap-3">
          <span
            className="rounded"
            style={{ width: "4px", height: "2.5rem", backgroundColor: theme }}
          ></span>
          <div className="d-flex flex-column">
            <span className="text-preset-5 text-muted">Spent</span>
            <span className="fw-bold text-preset-4">${spent}</span>
          </div>
        </div>
        <div className="d-flex gap-3">
          <span
            className="rounded"
            style={{ width: "4px", height: "2.5rem", backgroundColor: theme }}
          ></span>
          <div className="d-flex flex-column">
            <span className="text-preset-5 text-muted">Remaining</span>
            <span className="fw-bold text-preset-4">${remaining}</span>
          </div>
        </div>
      </div>
      <div
        className="card p-3"
        style={{ background: "var(--color-beige-100)" }}
      >
        <SeeDetails
          path={path}
          SeeDetail="See More"
          label="Latest Spending"
        ></SeeDetails>
        {latest3.map((item, index) => (
          <div className=" d-flex justify-content-between mb-3" key={index}>
            <div className="d-flex align-items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name + " avatar"}
                style={{ width: "3rem", borderRadius: "50%" }}
              />
              <span className="text-preset-4 fw-bold">{item.name}</span>
            </div>
            <div className="d-flex flex-column">
              <span
                className={`text-preset-4 fw-bold ${item.amount < 0 ? "text-danger" : " text-success"}`}
              >
                {item.amount < 0 && <span>-</span>} ${Math.abs(item.amount)}
              </span>
              <span className="text-preset-4 text-muted">
                {FormatDate(item.date)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
