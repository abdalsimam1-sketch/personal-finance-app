import React from "react";

export const BillsSummary = ({ label, total, color }) => {
  return (
    <div
      className="card p-3"
      style={{
        backgroundColor: "var(--color-beige-100)",
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div className="d-flex justify-content-between">
        <span className="text-preset-4 text-muted">{label}</span>
        <span className="fw-bold text-preset-4">${total}</span>
      </div>
    </div>
  );
};
