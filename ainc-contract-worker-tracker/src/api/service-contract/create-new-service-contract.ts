import { useMutation } from "@tanstack/react-query";
import { ContractService } from "..";
import { queryClient } from "@/components/provider/app-query-client-provider";

interface CreateNewServiceContractRequest {
  title: string;
  description: string;
  status: string;
  ownerId: string;
  developerCountRequired: string;
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

export const addNewServiceContract = (
  createNewServiceContractRequest: CreateNewServiceContractRequest
) => {
  return ContractService.post<FilterServiceContractsResponse>(
    "/api/v1/service-contract",
    createNewServiceContractRequest
  );
};

export const useAddNewServiceContract = () => {
  return useMutation({
    mutationFn: addNewServiceContract,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["filterServiceContracts"],
      });
    },
  });
};
