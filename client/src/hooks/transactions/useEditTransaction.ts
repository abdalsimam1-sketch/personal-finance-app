import { useQueryClient, useMutation } from "@tanstack/react-query";
import { editTransaction } from "../../services/transactions.services";
import type { ApiResponse } from "../../types/ApiResponse";
import type { AxiosError } from "axios";
import type { TransactionType } from "../../types/TransactionType";
import toast from "react-hot-toast";

export const useEditTransaction = () => {
  const queryClient = useQueryClient();
  const editTransactionMutation = useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    { payload: TransactionType; transactionId: string }
  >({
    mutationFn: ({ payload, transactionId }) =>
      editTransaction(payload, transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction updated");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Transaction update failed",
      );
    },
  });
  return { editTransactionMutation };
};
