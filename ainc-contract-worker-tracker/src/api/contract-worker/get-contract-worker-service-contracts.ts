import { useQuery } from "@tanstack/react-query";
import { ContractService } from "..";

export interface GetContractWorkerServiceContractsResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  owner: Owner;
  developerCountRequired: number;
  currentDeveloperCount: number;
  employees: null;
  allocatedBandwidth: number;
}

interface Owner {
  firstName: string;
  lastName: string;
  type: string;
  role: string;
  startDate: null;
  endDate: null;
  employeeNumber: string;
  status: string;
  email: string;
  phone: string;
  deleted: boolean;
}

export const getContractWorkerServiceContracts = (id: string) => {
  return ContractService.get<GetContractWorkerServiceContractsResponse[]>(
    `/api/v1/contract-worker/${id}/service-contracts`
  );
};

export const useContractWorkerServiceContracts = (id: string) => {
  return useQuery({
    queryKey: ["contractWorkerServiceContracts", id],
    queryFn: () => getContractWorkerServiceContracts(id),
  });
};
