import { api } from "../api/api";
import type { ApiResponse } from "../types/ApiResponse";
import type { PotType, AddPotType } from "../types/PotType";

export const getPots = async () => {
  const response = await api.get<ApiResponse<{ pots: PotType[] }>>("/pots/");
  return response.data;
};

export const addPot = async (payload: AddPotType) => {
  const response = await api.post<ApiResponse<{ pot: AddPotType }>>(
    "/pots",
    payload,
  );
  return response.data;
};
