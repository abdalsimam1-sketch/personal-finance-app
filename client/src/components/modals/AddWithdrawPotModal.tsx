import { useEffect, useRef, useState } from "react";
import close from "../../assets/icon-close-modal.svg";
import { PercentageBar } from "../PercentageBar";
import { Input } from "../Input";
import type { PotType } from "../../types/PotType";
import { useAddToPot } from "../../hooks/pots/useAddToPot";

export const AddWithdrawPotModal = ({
  addWithdrawModalOpen,
  closeModal,
  selectedPot,
}: {
  addWithdrawModalOpen: boolean;
  closeModal: () => void;
  selectedPot: PotType;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (addWithdrawModalOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [addWithdrawModalOpen]);

  const [amount, setNewAmount] = useState<string>("");
  const [error, setError] = useState<string>();

  const totalSaved = Number(selectedPot.totalSaved);
  const target = Number(selectedPot.target);
  const newTotal = totalSaved + (Number(amount) || 0);

  const percentage = target > 0 ? Math.min((newTotal / target) * 100, 100) : 0;

  const { addToPotMutation } = useAddToPot();

  const handleSubmit = (amount: string) => {
    const numberAmount = Number(amount);
    if (!numberAmount) {
      setError("Amount is required");
      return;
    }
    if (numberAmount <= 0) {
      setError("Amount has to be greater than 0");
      return;
    }

    addToPotMutation.mutate(
      { id: selectedPot.id, amount: numberAmount },
      {
        onSuccess: () => {
          closeModal();
        },
        onError: () => {},
      },
    );
  };

  return (
    <dialog
      ref={dialogRef}
      className="border border-gray-300 m-auto w-[min(95vw,500px)] rounded p-5 outline-0"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-heading">Add to {selectedPot?.name}</h1>
        <img
          src={close}
          alt="close modal icon"
          className="cursor-pointer"
          onClick={closeModal}
        />
      </div>
      <section>
        <p className="text-captions text-gray-500">
          Add money to this pot to get closer to your target. Your new total
          updates as you type.
        </p>
      </section>

      <section>
        <div className="flex justify-between items-center">
          <p className="text-captions text-gray-500">New Amount</p>
          <h1 className="text-heading">₦{newTotal.toLocaleString()}</h1>
        </div>

        <div>
          <PercentageBar color={selectedPot?.color} percentage={percentage} />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-captions text-gray-500">
            {percentage.toFixed(2)}%
          </p>
          <p className="text-captions text-gray-500">
            Target of ₦{target.toLocaleString()}
          </p>
        </div>
      </section>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(amount);
        }}
      >
        <Input
          error={error}
          label="Amount to add"
          placeholder="e.g  ₦1,000"
          type="number"
          value={amount}
          onChange={(e) => setNewAmount(e.target.value)}
        />
        <button className="w-full rounded bg-grey-900 text-white p-1 cursor-pointer">
          {addToPotMutation.isPending ? "Adding..." : "Add"}
        </button>
      </form>
    </dialog>
  );
};
