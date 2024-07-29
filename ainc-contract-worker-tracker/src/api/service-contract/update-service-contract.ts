import { useMutation } from "@tanstack/react-query";
import { ContractService } from "..";
import { queryClient } from "@/components/provider/app-query-client-provider";

interface EditServiceContractRequest {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface FilterServiceContractsResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  owner: Owner;
  developerCountRequired: number;
  currentDeveloperCount: number;
}

interface Owner {
  firstName: string;
  lastName: null;
  type: string;
  role: string;
  startDate: null;
  endDate: string;
  employeeNumber: string;
  status: string;
  email: string;
  phone: string;
  deleted: boolean;
}

export const editServiceContract = (
  editServiceContractRequest: EditServiceContractRequest
) => {
  return ContractService.patch<FilterServiceContractsResponse>(
    "/api/v1/service-contract/" + editServiceContractRequest.id,
    editServiceContractRequest
  );
};

export const useEditServiceContract = () => {
  return useMutation({
    mutationFn: editServiceContract,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceContract"] });
    },
  });
};
