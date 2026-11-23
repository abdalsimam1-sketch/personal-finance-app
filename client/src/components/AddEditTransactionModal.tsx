import { useEffect, useRef } from "react";
import { Input } from "./Input";
import close from "../assets/icon-close-modal.svg";
import { categoryOptions } from "../data/categories";
import { useForm } from "react-hook-form";
import type { TransactionType } from "../types/TransactionType";
import { useAddTransaction } from "../hooks/transactions/useAddTransaction";

export const AddEditTransactionModal = ({
  modalOpen,
  closeModal,
}: {
  modalOpen: boolean;
  closeModal: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionType>();

  const { addTransactionMutation } = useAddTransaction();

  const onSubmit = (transactionForm: TransactionType) => {
    addTransactionMutation.mutate(transactionForm, {
      onSuccess: () => {
        reset();
        closeModal();
      },
    });
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [modalOpen]);
  return (
    <dialog
      ref={dialogRef}
      className="m-auto flex flex-col p-5 w-[min(95vw,500px)] rounded"
    >
      <div className="flex justify-between items-center cursor-pointer">
        <h1 className="text-heading">Add New Transaction</h1>
        <img
          src={close}
          alt="close icon"
          className="w-[1.5rem]"
          onClick={closeModal}
        />
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Recipient/Sender"
          placeholder="John Doe"
          {...register("name", {
            required: "Name is required",
          })}
          error={errors.name?.message}
        />
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <label htmlFor="categories">Category</label>
            {errors.category && (
              <p className="text-red text-captions font-bold">
                {errors.category.message}
              </p>
            )}
          </div>
          <select
            {...register("category", {
              required: "Category is required",
            })}
            id="categories"
            className={`border  p-1.5 outline-0 rounded ${errors.type ? " border-red" : "border-gray-300"}`}
          >
            {categoryOptions.map((item) => (
              <div key={item.label}>
                <option value={item.value}>{item.label}</option>
              </div>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <label htmlFor="types">Type</label>
            {errors.type && (
              <p className="text-red text-captions font-bold">
                {errors.type.message}
              </p>
            )}
          </div>
          <select
            {...register("type", {
              required: "Type is required",
            })}
            id="types"
            className={`border  p-1.5 outline-0 rounded ${errors.type ? " border-red" : "border-gray-300"}`}
          >
            <option value="">Choose type</option>
            <option value="addition">Addition</option>
            <option value="withdrwal">Withdrawal</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="date">Date</label>
              {errors.date && (
                <p className="text-red text-captions font-bold">
                  {errors.date.message}
                </p>
              )}
            </div>
            <input
              {...register("date", {
                required: "Date is required",
              })}
              id="date"
              type="date"
              defaultValue={new Date().toLocaleDateString("en-CA")}
              className={`border py-0.8 pl-1 outline-0 h-[2rem] rounded ${errors.type ? " border-red" : "border-gray-300"} w-full`}
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="amount">Amount</label>
              {errors.amount && (
                <p className="text-red text-captions font-bold">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <input
              {...register("amount", {
                required: "Amount is required",
              })}
              type="number"
              className={`border py-0.8 pl-1 outline-0 h-[2rem] rounded ${errors.type ? " border-red" : "border-gray-300"} w-full`}
              placeholder=" ₦5,000"
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            className="border border-grey-300 p-1 px-3 rounded cursor-pointer"
            onClick={closeModal}
            type="button"
            disabled={addTransactionMutation.isPending}
          >
            Cancel
          </button>
          <button
            disabled={addTransactionMutation.isPending}
            className={`bg-grey-900 p-1 px-5 text-white rounded cursor-pointer ${addTransactionMutation.isPending ? "opacity-60 disabled:cursor-not-allowed" : ""}`}
            type="submit"
          >
            {addTransactionMutation.isPending ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </dialog>
  );
};
