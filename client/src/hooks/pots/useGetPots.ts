import { useQuery } from "@tanstack/react-query";
import { getPots } from "../../services/pots.services";
import type { ApiResponse } from "../../types/ApiResponse";
import type { AxiosError } from "axios";
import type { PotType } from "../../types/PotType";

export const useGetPots = () => {
  const getPotsQuery = useQuery<
    ApiResponse<{ pots: PotType[] }>,
    AxiosError<ApiResponse>
  >({
    queryKey: ["pots"],
    queryFn: () => getPots(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  return { getPotsQuery };
};
