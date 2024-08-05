import { useMutation, useQuery } from "@tanstack/react-query";
import { ContractService } from "..";
import { queryClient } from "@/components/provider/app-query-client-provider";

export const deleteContractWorker = (id: string) => {
  return ContractService.delete(`/api/v1/contract-worker/${id}`);
};

export const useDeleteContractWorker = () => {
  return useMutation({
    mutationFn: deleteContractWorker,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contractWorker"] });
    },
  });
};
