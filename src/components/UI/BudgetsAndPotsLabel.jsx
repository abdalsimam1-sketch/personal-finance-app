import React, { useState } from "react";

export const BudgetsAndPotsLabel = ({
  label,
  color,
  variant,
  onEdit,
  onDelete,
}) => {
  const [dotsOpen, setDotsOpen] = useState(false);
  const toggleDots = () => {
    setDotsOpen(!dotsOpen);
  };
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-2">
        <span
          style={{
            width: "1rem",
            height: "1rem",
            borderRadius: "50%",
            backgroundColor: color,
          }}
        ></span>
        <span className="text-preset-3 fw-bold">{label}</span>
      </div>
      <div className="position-relative">
        <i
          className="bi bi-three-dots"
          onClick={toggleDots}
          style={{ cursor: "pointer" }}
        ></i>
        {dotsOpen && (
          <div
            className="d-flex flex-column position-absolute bg-light p-3 text-nowrap rounded end-0"
            style={{ width: "10rem", zIndex: "100" }}
          >
            <span
              className="btn"
              onClick={() => {
                toggleDots();
                onEdit();
              }}
            >
              Edit {variant}
            </span>

            <span
              className="text-danger btn"
              onClick={() => {
                toggleDots();
                onDelete();
              }}
            >
              {" "}
              Delete {variant}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
