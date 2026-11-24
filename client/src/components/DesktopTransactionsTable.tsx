import type { TransactionType } from "../types/TransactionType";
import { formatDate } from "../utils/formatDate";

export const DesktopTransactionsTable = ({
  openEditModal,
  setMode,
  setSelectedTransaction,
  transaction,
}: {
  openEditModal: any;
  setMode: any;
  setSelectedTransaction: any;
  transaction: TransactionType;
}) => {
  return (
    <div
      onClick={() => {
        openEditModal();
        setSelectedTransaction();
        setMode();
      }}
      className="grid grid-cols-[3fr_1.5fr_1.5fr_auto] gap-4 border-b border-gray-200 py-4 cursor-pointer"
    >
      <p className="font-bold">{transaction.name}</p>
      <p className="capitalize text-gray-500">{transaction.category}</p>
      <p className="text-gray-500">{formatDate(transaction.date)}</p>
      <p
        className={`${transaction.type === "addition" ? "text-green" : "text-red"} font-bold`}
      >
        {transaction.type === "addition" ? "+" : "-"} ₦
        {Number(transaction.amount).toLocaleString()}
      </p>
    </div>
  );
};
