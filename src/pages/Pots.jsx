import React, { useState } from "react";
import { Title } from "../components/UI/Title";
import { PotsCard } from "../components/UI/PotsCard";
import { Button } from "../components/UI/Button";
import { AddEditPotsModal } from "../components/UI/AddEditPotsModal";
import { DeleteModal } from "../components/UI/DeleteModal";
import { AddWithdrawMoney } from "../components/UI/AddWithdrawMoney";

import { useFinance } from "../context/FinanceContext";
export const Pots = () => {
  const { pots,addMoney,withdrawMoney } = useFinance();
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const [mode, setMode] = useState("add");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const toggleDelete = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };
  const [addWithdrawOpen, setAddWithdrawOpen] = useState(false);
  const toggleAddWithdraw = () => {
    setAddWithdrawOpen(!addWithdrawOpen);
  };
  const [addWithdrawMode, setAddWithdrawMode] = useState("withdraw");
  const [selectedPot, setSelectedPot] = useState(null);

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
        {pots?.map((item) => (
          <div className="col-12 col-lg-6" key={item.name}>
            <PotsCard
              onAdd={() => {
                setAddWithdrawMode("add");
                toggleAddWithdraw();
                setSelectedPot(item);
               
              }}
              onWithdraw={() => {
                setAddWithdrawMode("withdraw");
                toggleAddWithdraw();
                setSelectedPot(item);
              
              }}
              onDelete={() => {
                toggleDelete();
                setSelectedPot(item);
              }}
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
      {deleteModalOpen && (
        <DeleteModal
          variant="pot"
          category={selectedPot.name}
          onClose={toggleDelete}
        ></DeleteModal>
      )}

      {addWithdrawOpen && (
        <AddWithdrawMoney
          pot={selectedPot.name}
          mode={addWithdrawMode}
          originalAmount={selectedPot.total}
          target={selectedPot.target}
          onClose={toggleAddWithdraw}
        ></AddWithdrawMoney>
      )}
    </div>
  );
};
