import { useMutation } from "@tanstack/react-query";
import { ContractService } from "..";

interface AddNewContractWorkerRequest {
  firstName: string;
  lastName: string;
  type: string;
  role: string;
  startDate: string;
  endDate: string;
  status: string;
  email: string;
  phone: string;
}

export const addNewContractWorker = (
  contractWorkerRequest: AddNewContractWorkerRequest
) => {
  return ContractService.post<AddNewContractWorkerRequest>(
    "api/v1/contract-worker",
    contractWorkerRequest
  );
};

export const useAddNewContractWorker = () => {
  return useMutation({
    mutationFn: addNewContractWorker,
  });
};
