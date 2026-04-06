import React from "react";
import { Title } from "../components/UI/Title";
import { PotsCard } from "../components/UI/PotsCard";
import { Button } from "../components/UI/Button";
export const Pots = () => {
  return (
    <div className="container d-flex flex-column gap-3 ">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <Title>Pots</Title>
        <Button variant="primary">+ Add New Pot</Button>
      </div>
      <section className="row">
        <PotsCard label="Savings"></PotsCard>
      </section>
    </div>
  );
};
