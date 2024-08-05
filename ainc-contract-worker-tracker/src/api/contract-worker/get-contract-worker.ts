import { useQuery } from "@tanstack/react-query";
import { ContractService } from "..";

interface GetContractWorkerResponse {
  firstName: string;
  lastName: string;
  type: string;
  role: string;
  startDate: string;
  endDate: string;
  employeeNumber: string;
  status: string;
  email: string;
  phone: string;
  deleted: boolean;
  availableBandwidth: number;
}

export const getContractWorker = (id: string) => {
  return ContractService.get<GetContractWorkerResponse>(
    `/api/v1/contract-worker/${id}`
  );
};

export const useContractWorker = (id: string) => {
  return useQuery({
    queryKey: ["contractWorker", id],
    queryFn: () => getContractWorker(id),
  });
};
