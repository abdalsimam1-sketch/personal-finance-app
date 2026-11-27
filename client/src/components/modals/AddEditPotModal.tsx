import { useEffect, useRef } from "react";
import { Input } from "../Input";
import close from "../../assets/icon-close-modal.svg";
import { colors } from "../../data/colors";
import { useForm } from "react-hook-form";
import type { AddEditPotType, PotType } from "../../types/PotType";
import { useAddPot } from "../../hooks/pots/useAddPot";
import { useEditPot } from "../../hooks/pots/useEditPot";

export const AddEditPotModal = ({
  addEditModalOpen,
  closeModal,
  takenColors,
  mode,
  selectedPot,
}: {
  addEditModalOpen: boolean;
  closeModal: () => void;
  takenColors: any;
  mode: "add" | "edit";
  selectedPot: PotType | null;
}) => {
  const defaultValues =
    mode === "edit" && selectedPot
      ? {
          name: selectedPot.name,
          target: selectedPot.target,
          color: selectedPot.color,
        }
      : {
          name: "",
          target: 0,
          color: "",
        };

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (addEditModalOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddEditPotType>({ defaultValues });

  const { addPotMutation } = useAddPot();
  const { editPotMutation } = useEditPot();

  const onSubmit = (potForm: AddEditPotType) => {
    if (mode === "add") {
      addPotMutation.mutate(potForm, {
        onSuccess: () => {
          reset();
          closeModal();
        },
      });
    } else {
      editPotMutation.mutate(
        {
          payload: potForm,
          id: selectedPot?.id as string,
        },
        {
          onSuccess: () => {
            reset();
            closeModal();
          },
        },
      );
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      className="border border-gray-300 m-auto w-[min(95vw,500px)] p-5 rounded"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-heading">
          {mode === "add" ? "Add New Pot" : "Edit Pot"}
        </h1>
        <img
          src={close}
          alt="close modal"
          onClick={closeModal}
          className="cursor-pointer"
        />
      </div>
      <p className="text-captions text-gray-500">
        {mode === "add"
          ? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
          : "As your budgets change, feel free to update your spending limits."}
      </p>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Pot Name"
          placeholder="e.g rainy days"
          type="text"
          {...register("name", {
            required: "Name is required",
          })}
          error={errors.name?.message}
        />
        <Input
          label="Target"
          placeholder="₦ e.g 2,000"
          type="number"
          {...register("target", {
            required: "Target is required",
            valueAsNumber: true,
          })}
          error={errors.target?.message}
        />
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <label htmlFor="color">Color</label>
            {errors.color && (
              <p className="text-captions text-red font-bold">
                {errors.color.message}
              </p>
            )}
          </div>
          <select
            id="color"
            className="capitalize border border-gray-300 p-1 rounded"
            {...register("color", {
              required: "Color is required",
            })}
          >
            <option value="">Choose color</option>
            {colors.map((item) => (
              <option value={item} key={item} disabled={takenColors.has(item)}>
                <p> {item}</p>{" "}
                {takenColors.has(item) && (
                  <p className="text-captions">(Taken)</p>
                )}
              </option>
            ))}
          </select>
        </div>
        <button
          className="border bg-gray-900 text-white w-full rounded p-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={addPotMutation.isPending || editPotMutation.isPending}
        >
          {mode === "add"
            ? addPotMutation.isPending
              ? "Adding..."
              : "Add Pot"
            : editPotMutation.isPending
              ? "Editting..."
              : "Edit Pot"}
        </button>
      </form>
    </dialog>
  );
};
