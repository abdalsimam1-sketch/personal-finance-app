import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPot } from "../../services/pots.services";
import type { ApiResponse } from "../../types/ApiResponse";
import type { AxiosError } from "axios";
import type { AddEditPotType } from "../../types/PotType";
import toast from "react-hot-toast";

export const useEditPot = () => {
  const queryClient = useQueryClient();
  const editPotMutation = useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    {
      payload: AddEditPotType;
      id: string;
    }
  >({
    mutationFn: ({ payload, id }) => editPot(payload, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pots"] });
      toast.success("Pot edited successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });
  return { editPotMutation };
};
