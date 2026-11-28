import { useMutation, useQueryClient } from "@tanstack/react-query";
import { withrawFromPot } from "../../services/pots.services";
import type { ApiResponse } from "../../types/ApiResponse";
import type { PotType } from "../../types/PotType";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useWithdrawFromPot = () => {
  const queryClient = useQueryClient();
  const withdrawFromPotMutation = useMutation<
    ApiResponse<{ pot: PotType }>,
    AxiosError<ApiResponse>,
    {
      id: string;
      amount: number;
    }
  >({
    mutationFn: ({ id, amount }) => withrawFromPot(id, amount),
    onSuccess: () => {
      toast.success("Withdrawal successful");
      queryClient.invalidateQueries({ queryKey: ["pots"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
  return { withdrawFromPotMutation };
};
