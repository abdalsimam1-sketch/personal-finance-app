import { PotCard } from "../components/PotCard";
import { useGetPots } from "../hooks/pots/useGetPots";
import type { PotType } from "../types/PotType";
import { PotSkeleton } from "../components/PotSkeleton";
import { ErrorMessage } from "../components/ErrorMessage";

export const Pots = () => {
  const { getPotsQuery } = useGetPots();

  const pots = getPotsQuery.data?.data?.pots;
  const error = getPotsQuery.error?.response?.data?.message;
  console.log("error", error);

  return (
    <div className="p-5 flex flex-col gap-5 pb-20">
      <section className="flex justify-between">
        <h1 className="text-heading">Pots</h1>
        <button className="bg-gray-900 rounded  p-1 px-3 text-white self-center ">
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
                color={item.color}
                name={item.name}
                totalSaved={item.totalSaved}
                target={item.target}
              />
            </div>
          ))
        )}
      </section>
    </div>
  );
};
