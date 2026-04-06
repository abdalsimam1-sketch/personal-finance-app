import React from "react";
import { Title } from "../components/UI/Title";
export const Pots = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <Title>Pots</Title>
        <button className="btn bg-dark text-light">+ Add New Pot</button>
      </div>
    </div>
  );
};
