import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToPot } from "../../services/pots.services";
import type { ApiResponse } from "../../types/ApiResponse";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useAddToPot = () => {
  const queryClient = useQueryClient();
  const addToPotMutation = useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    {
      id: string;
      amount: number;
    }
  >({
    mutationFn: ({ id, amount }) => addToPot(id, amount),
    onSuccess: () => {
      toast.success("Addition successful");
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
  return { addToPotMutation };
};
