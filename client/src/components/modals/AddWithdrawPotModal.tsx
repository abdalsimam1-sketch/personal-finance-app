import { useEffect, useRef, useState } from "react";
import close from "../../assets/icon-close-modal.svg";
import { PercentageBar } from "../PercentageBar";
import { Input } from "../Input";
import type { PotType } from "../../types/PotType";
import { useAddToPot } from "../../hooks/pots/useAddToPot";
import { useWithdrawFromPot } from "../../hooks/pots/useWithdrawFromPot";

export const AddWithdrawPotModal = ({
  addWithdrawModalOpen,
  closeModal,
  selectedPot,
  mode,
}: {
  addWithdrawModalOpen: boolean;
  closeModal: () => void;
  selectedPot: PotType;
  mode: "add" | "withdraw";
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
  const newTotalSum = Math.min(totalSaved + (Number(amount) || 0));
  const newTotalDifference = Math.max(totalSaved - (Number(amount) || 0), 0);

  const percentage =
    target > 0
      ? Math.min(
          (mode === "add"
            ? newTotalSum / target
            : newTotalDifference / target) * 100,
          100,
        )
      : 0;

  const { addToPotMutation } = useAddToPot();
  const { withdrawFromPotMutation } = useWithdrawFromPot();

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

    if (mode === "add") {
      addToPotMutation.mutate(
        { id: selectedPot.id, amount: numberAmount },
        {
          onSuccess: () => {
            closeModal();
          },
          onError: () => {
            closeModal();
          },
        },
      );
    } else {
      withdrawFromPotMutation.mutate(
        {
          id: selectedPot.id,
          amount: numberAmount,
        },
        {
          onSuccess: () => {
            closeModal();
          },
          onError: () => {
            closeModal();
          },
        },
      );
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="border border-gray-300 m-auto w-[min(95vw,500px)] rounded p-5 outline-0 flex flex-col gap-3 "
    >
      <div className="flex items-center justify-between">
        <h2 className="text-subheading">
          {mode === "add" ? "Add to" : "Withdraw from "} {selectedPot?.name}
        </h2>
        <img
          src={close}
          alt="close modal icon"
          className="cursor-pointer w-[1.5rem]"
          onClick={closeModal}
        />
      </div>
      <section>
        <p className="text-captions text-gray-500">
          {mode === "add"
            ? " Add money to this pot to get closer to your target. Your new totalupdates as you type."
            : "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot"}
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-captions text-gray-500">New Amount</p>
          <h2 className="text-subheading">
            ₦
            {mode === "add"
              ? newTotalSum.toLocaleString()
              : newTotalDifference.toLocaleString()}
          </h2>
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
          label={mode === "add" ? "Amount to add" : "Amount to withdraw"}
          placeholder="e.g  ₦1,000"
          type="number"
          value={amount}
          onChange={(e) => setNewAmount(e.target.value)}
        />
        <button
          className="w-full rounded bg-grey-900 text-white p-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          disabled={
            addToPotMutation.isPending || withdrawFromPotMutation.isPending
          }
        >
          {mode === "add"
            ? addToPotMutation.isPending
              ? "Adding..."
              : "Add"
            : withdrawFromPotMutation.isPending
              ? "Withdrawing..."
              : "Withdraw"}
        </button>
      </form>
    </dialog>
  );
};
