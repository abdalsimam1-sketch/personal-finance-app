import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTransaction } from "../../services/transactions.services";
import toast from "react-hot-toast";
import type { ApiResponse } from "../../types/ApiResponse";
import type { AxiosError } from "axios";
import type { TransactionType } from "../../types/TransactionType";

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const addTransactionMutation = useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    TransactionType
  >({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction added");
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "Transaction failed");
    },
  });
  return { addTransactionMutation };
};
