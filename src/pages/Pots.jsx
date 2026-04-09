import React, { useState } from "react";
import { Title } from "../components/UI/Title";
import { PotsCard } from "../components/UI/PotsCard";
import { Button } from "../components/UI/Button";
import { AddEditPotsModal } from "../components/UI/AddEditPotsModal";

import data from "../data/data.json";
export const Pots = () => {
  const pots = data.pots;
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const [mode, setMode] = useState("add");
  return (
    <div className="container d-flex flex-column gap-3 ">
      <div className="d-flex justify-content-between align-items-center mt-4">
        <Title>Pots</Title>
        <Button
          variant="primary"
          onClick={() => {
            toggleModal();
            setMode("add");
          }}
        >
          + Add New Pot
        </Button>
      </div>
      <section className="row g-3">
        {pots.map((item) => (
          <div className="col-12 col-lg-6" key={item.name}>
            <PotsCard
              onEdit={() => {
                toggleModal();
                setMode("edit");
              }}
              label={item.name}
              color={item.theme}
              target={item.target}
              total={item.total}
              percentage={((item.total / item.target) * 100).toFixed(2)}
            ></PotsCard>
          </div>
        ))}
      </section>
      {modalOpen && (
        <AddEditPotsModal
          mode={mode}
          maximumCharacters={17}
          onClose={toggleModal}
        ></AddEditPotsModal>
      )}
    </div>
  );
};
