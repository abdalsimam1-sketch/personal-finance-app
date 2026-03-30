import React from "react";

export const BalanceCard = ({ background, label, amount, currency }) => {
  return (
    <div
      className={`card p-3 ${background} ${background === "bg-dark" ? "text-light" : ""}`}
    >
      <span className="text-preset-5">{label}</span>
      <h1 className="text-preset-1">
        <span>{currency}</span>
        {amount}
      </h1>
    </div>
  );
};
