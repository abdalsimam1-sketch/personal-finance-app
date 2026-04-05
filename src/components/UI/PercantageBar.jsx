import React from "react";

export const PercantageBar = ({ percentage, color }) => {
  return (
    <div className="w-100 card" style={{ height: "1.2rem" }}>
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
          height: "100%",
        }}
        className="rounded"
      ></div>
    </div>
  );
};
