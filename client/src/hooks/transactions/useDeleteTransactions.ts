import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../../services/transactions.services";
import toast from "react-hot-toast";
import type { ApiResponse } from "../../types/ApiResponse";
import type { AxiosError } from "axios";

export const useDeleteTransactions = () => {
  const queryClient = useQueryClient();
  const deleteTransactionMutation = useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    string
  >({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast.success("Transaction deleted");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
  return { deleteTransactionMutation };
};
