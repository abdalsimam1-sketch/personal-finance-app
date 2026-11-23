import { api } from "../api/api";
import type { ApiResponse } from "../types/ApiResponse";
import type { GetTransactionsType } from "../types/GetTransactionsType";
import type { TransactionType } from "../types/TransactionType";

export const getTransactions = async (params: GetTransactionsType) => {
  const response = await api.get("/transactions", {
    params: {
      page: params.page,
      limit: params.limit,
      search: params.search,
      filter: params.filter,
      category: params.category || undefined,
    },
  });

  return response.data;
};
export const addTransaction = async (payload: TransactionType) => {
  const response = await api.post<ApiResponse>("/transactions", payload);
  return response.data;
};
