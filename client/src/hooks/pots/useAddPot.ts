import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPot } from "../../services/pots.services";
import type { AddPotType } from "../../types/PotType";
import type { ApiResponse } from "../../types/ApiResponse";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useAddPot = () => {
  const queryClient = useQueryClient();
  const addPotMutation = useMutation<
    ApiResponse<{ pot: AddPotType }>,
    AxiosError<ApiResponse>,
    AddPotType
  >({
    mutationFn: (payload) => addPot(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      toast.success("Pot added successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Somthing went wrong");
    },
  });

  return {
    addPotMutation,
  };
};
