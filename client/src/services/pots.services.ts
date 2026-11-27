import { api } from "../api/api";
import type { ApiResponse } from "../types/ApiResponse";
import type { PotType, AddEditPotType } from "../types/PotType";

export const getPots = async () => {
  const response = await api.get<ApiResponse<{ pots: PotType[] }>>("/pots/");
  return response.data;
};

export const addPot = async (payload: AddEditPotType) => {
  const response = await api.post<ApiResponse<{ pot: AddEditPotType }>>(
    "/pots",
    payload,
  );
  return response.data;
};

export const editPot = async (payload: AddEditPotType, id: string) => {
  const response = await api.patch(`/pots/${id}`, payload);
  return response.data;
};
