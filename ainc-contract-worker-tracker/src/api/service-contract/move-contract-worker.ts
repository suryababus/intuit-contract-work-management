import { useMutation } from "@tanstack/react-query";
import { ContractService } from "..";
import { queryClient } from "@/components/provider/app-query-client-provider";

type MoveContractWorkerRequest = {
  employeeNumber: string;
  destinationContractId: string;
  sourceContractId: string;
};

export const moveContractWorker = (
  moveContractWorkerRequest: MoveContractWorkerRequest
) => {
  return ContractService.post<boolean>(
    "/api/v1/service-contract/" +
      moveContractWorkerRequest.sourceContractId +
      "/move",
    moveContractWorkerRequest
  );
};

export const useMoveContractWorker = () => {
  return useMutation({
    mutationFn: moveContractWorker,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["serviceContract"] });
    },
  });
};
