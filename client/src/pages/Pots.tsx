import { PotCard } from "../components/PotCard";
import { useGetPots } from "../hooks/pots/useGetPots";
import type { PotType } from "../types/PotType";
import { PotSkeleton } from "../components/PotSkeleton";
import { ErrorMessage } from "../components/ErrorMessage";
import { AddEditPotModal } from "../components/modals/AddEditPotModal";
import { useState } from "react";

export const Pots = () => {
  const { getPotsQuery } = useGetPots();

  const pots = getPotsQuery.data?.data?.pots;
  const error = getPotsQuery.error?.response?.data?.message;
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const takenColors = new Set(pots?.map((item) => item.color));
  const [selectedPot, setSelectedPot] = useState<PotType | null>(null);

  return (
    <div className="p-5 flex flex-col gap-5 pb-20">
      <section className="flex justify-between">
        <h1 className="text-heading">Pots</h1>
        <button
          disabled={Number(pots?.length) >= 8}
          className="bg-gray-900 rounded  p-1 px-3 text-white self-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={() => {
            setAddEditModalOpen(true);
            setMode("add");
          }}
        >
          + Add New Pot
        </button>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {getPotsQuery.isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <PotSkeleton />
            </div>
          ))
        ) : getPotsQuery.isError ? (
          <div className="col-span-full  h-[30rem] flex justify-center items-center">
            <ErrorMessage error={error || "Something went wrong"} />
          </div>
        ) : (
          pots?.map((item: PotType) => (
            <div key={item.id}>
              <PotCard
                selectedPotId={item.id}
                setAddEditModalOpen={() => {
                  setAddEditModalOpen(true);
                  setMode("edit");
                  setSelectedPot(item);
                }}
                color={item.color}
                name={item.name}
                totalSaved={item.totalSaved}
                target={item.target}
              />
            </div>
          ))
        )}
      </section>

      {addEditModalOpen && (
        <AddEditPotModal
          selectedPot={selectedPot}
          mode={mode}
          takenColors={takenColors}
          addEditModalOpen={addEditModalOpen}
          closeModal={() => setAddEditModalOpen(false)}
        />
      )}
    </div>
  );
};
