import type { TransactionType } from "../types/TransactionType";
import { formatDate } from "../utils/formatDate";

export const MobileTransactionsTable = ({
  transaction,
  openEditModal,
  setMode,
  setSelectedTransaction,
}: {
  transaction: TransactionType;
  openEditModal: any;
  setMode: any;
  setSelectedTransaction: any;
}) => {
  return (
    <div
      onClick={() => {
        openEditModal();
        setMode();
        setSelectedTransaction();
      }}
      className="flex  justify-between border-b border-gray-200 py-1"
    >
      <div>
        <p className="font-bold">{transaction.name}</p>
        <p className="capitalize text-captions text-gray-500">
          {transaction.category}
        </p>
      </div>
      <div>
        <p
          className={`${transaction.type === "addition" ? "text-green" : "text-red"} font-bold`}
        >
          {transaction.type === "addition" ? "+" : "-"} ₦
          {Number(transaction.amount).toLocaleString()}
        </p>
        <p className="text-captions text-gray-500">
          {formatDate(transaction.date)}
        </p>
      </div>
    </div>
  );
};
