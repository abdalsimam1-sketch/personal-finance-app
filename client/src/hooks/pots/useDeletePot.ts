import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePot } from "../../services/pots.services";
import type { ApiResponse } from "../../types/ApiResponse";
import type { AxiosError } from "axios";
import type { PotType } from "../../types/PotType";
import toast from "react-hot-toast";

export const useDeletePot = () => {
  const queryClient = useQueryClient();

  const deletePotMutation = useMutation<
    ApiResponse<{ pot: PotType }>,
    AxiosError<ApiResponse>,
    string
  >({
    mutationFn: deletePot,
    onSuccess: () => {
      toast.success("Pot deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  return {
    deletePotMutation,
  };
};
