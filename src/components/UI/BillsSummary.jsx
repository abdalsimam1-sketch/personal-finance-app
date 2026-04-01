import React from "react";

export const BillsSummary = ({ label, amount, color }) => {
  return (
    <div
      className="card p-2"
      style={{
        width: "10rem",
        backgroundColor: "var(--color-beige-100)",
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div className="d-flex justify-content-between">
        <span className="text-preset-4 text-muted">{label}</span>
        <span className="fw-bold text-preset-4">{amount}</span>
      </div>
    </div>
  );
};
