import { api } from "../api/api";
import type { ApiResponse } from "../types/ApiResponse";
import type { PotType } from "../types/PotType";

export const getPots = async () => {
  const response =
    await api.get<ApiResponse<{ pots: PotType[] }>>("/pots/water");
  return response.data;
};
