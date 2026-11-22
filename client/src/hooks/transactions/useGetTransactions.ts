import type { GetTransactionsType } from "../../types/GetTransactionsType";
import { getTransactions } from "../../services/transactions.services";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactions = (params: GetTransactionsType) => {
  const getTransactionsQuery = useQuery({
    queryKey: ["transactions", params],
    queryFn: () => getTransactions(params),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  return { getTransactionsQuery };
};
