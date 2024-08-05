import { useMutation } from "@tanstack/react-query";
import { ContractService } from "..";
import { queryClient } from "@/components/provider/app-query-client-provider";

type AssignEmployeeServiceContractRequest = {
  serviceContractId: string;
  employeeId: string;
  bandWidthPercentage: number;
};

export const assignEmployeeServiceContract = ({
  employeeId,
  serviceContractId,
  bandWidthPercentage,
}: AssignEmployeeServiceContractRequest) => {
  return ContractService.post<boolean>(
    `/api/v1/service-contract/${serviceContractId}/assign`,
    {
      employeeId,
      bandWidthPercentage,
    }
  );
};

export const useAssignEmployeeServiceContract = () => {
  return useMutation({
    mutationKey: ["assignEmployeeServiceContract"],
    mutationFn: assignEmployeeServiceContract,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["serviceContract"],
      });
    },
  });
};
