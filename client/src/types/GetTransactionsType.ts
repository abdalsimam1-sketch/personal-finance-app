export type GetTransactionsType = {
  page: number;
  limit: number;
  search?: string;
  filter?: string;
  category?: string;
};
