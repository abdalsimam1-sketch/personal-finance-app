import { useState } from "react";
import dots from "../assets/icon-ellipsis.svg";
import { PercentageBar } from "./PercentageBar";
import { Actions } from "./Actions";
import { DeleteModal } from "./modals/DeleteModal";
import { useDeletePot } from "../hooks/pots/useDeletePot";
import { AddWithdrawPotModal } from "./modals/AddWithdrawPotModal";
import type { PotType } from "../types/PotType";

export const PotCard = ({
  color,
  name,
  totalSaved,
  target,
  selectedPotId,
  setAddEditModalOpen,
  onAdd,
  selectedPot,
}: {
  color: string;
  name: string;
  totalSaved: number;
  target: number;
  selectedPotId: string;
  setAddEditModalOpen: (modalOpen: boolean) => void;
  onAdd: () => void;
  selectedPot: PotType;
}) => {
  const percentage = Number(totalSaved / target) * 100;
  const [potActionsOpen, setPotActionsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addWithdrawModalOpen, setAddWithdrawModalOpen] = useState(false);
  const { deletePotMutation } = useDeletePot();

  return (
    <div className="w-full border border-gray-300 rounded p-5 flex flex-col gap-3 bg-white">
      <section className="flex justify-between">
        <span className="flex gap-3 items-center">
          <div
            className={`rounded-3xl w-5 h-5 `}
            style={{
              backgroundColor: `var(--color-${color})`,
            }}
          ></div>
          <p className="capitalize">{name}</p>
        </span>
        <div className="relative">
          <img
            src={dots}
            alt="dots"
            className="cursor-pointer"
            onClick={() => {
              setPotActionsOpen((current) => !current);
            }}
          />
          {potActionsOpen && (
            <Actions
              onEdit={() => {
                setAddEditModalOpen(true);
                setPotActionsOpen(false);
              }}
              feature="Pot"
              onDelete={() => {
                setDeleteModalOpen(true);
                setPotActionsOpen(false);
              }}
            />
          )}
        </div>
      </section>

      <section className="flex items-center justify-between">
        <p className="text-captions text-gray-500">Total Saved</p>
        <h1 className="text-heading ">
          ₦ {Number(totalSaved).toLocaleString()}
        </h1>
      </section>

      <section>
        <PercentageBar percentage={percentage} color={color} />
      </section>

      <section className="text-captions text-gray-500 flex justify-between">
        <p className="font-bold">{percentage.toFixed(2)}%</p>
        <p>Target of ₦{Number(target).toLocaleString()}</p>
      </section>

      <div className="grid grid-cols-2 gap-5">
        <button
          className="bg-beige-100 p-1 border rounded border-gray-300 cursor-pointer"
          onClick={() => {
            setAddWithdrawModalOpen(true);
            onAdd();
          }}
        >
          + Add Money
        </button>
        <button className="bg-beige-100 p-1 border rounded border-gray-300 cursor-pointer">
          - Withdraw Money
        </button>
      </div>

      {deleteModalOpen && (
        <DeleteModal
          feature="pot"
          deleteModalOpen={true}
          closeDeleteModal={() => setDeleteModalOpen(false)}
          deleteFunction={() => {
            deletePotMutation.mutate(selectedPotId, {
              onSuccess: () => {
                setDeleteModalOpen(false);
              },
            });
          }}
          buttonDisabled={deletePotMutation.isPending}
        />
      )}

      {addWithdrawModalOpen && (
        <AddWithdrawPotModal
          selectedPot={selectedPot}
          addWithdrawModalOpen={addWithdrawModalOpen}
          closeModal={() => setAddWithdrawModalOpen(false)}
        />
      )}
    </div>
  );
};
