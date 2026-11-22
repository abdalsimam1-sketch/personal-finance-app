import { api } from "../api/api";
import type { GetTransactionsType } from "../types/GetTransactionsType";

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
