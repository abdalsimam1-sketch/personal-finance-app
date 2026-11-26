import dots from "../assets/icon-ellipsis.svg";
import { PercentageBar } from "./PercentageBar";

export const PotCard = ({
  color,
  name,
  totalSaved,
  target,
}: {
  color: string;
  name: string;
  totalSaved: number;
  target: number;
}) => {
  const percentage = Number(totalSaved / target) * 100;
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
        <img src={dots} alt="dots" className="cursor-pointer" />
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
        <button className="bg-beige-100 rounded p-1 border rounded border-gray-300 cursor-pointer">
          + Add Money
        </button>
        <button className="bg-beige-100 rounded p-1 border rounded border-gray-300 cursor-pointer">
          - Withdraw Money
        </button>
      </div>
    </div>
  );
};
