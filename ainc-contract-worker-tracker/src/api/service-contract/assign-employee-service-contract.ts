import { useMutation } from "@tanstack/react-query";
import { ContractService } from "..";
import { queryClient } from "@/components/provider/app-query-client-provider";

type AssignEmployeeServiceContractRequest = {
  serviceContractId: string;
  employeeId: string;
};

export const assignEmployeeServiceContract = ({
  employeeId,
  serviceContractId,
}: AssignEmployeeServiceContractRequest) => {
  return ContractService.post<boolean>(
    `/api/v1/service-contract/${serviceContractId}/assign`,
    {
      employeeId,
    }
  );
};

export const useAssignEmployeeServiceContract = () => {
  return useMutation({
    mutationKey: ["assignEmployeeServiceContract"],
    mutationFn: assignEmployeeServiceContract,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceContract"] });
    },
  });
};
