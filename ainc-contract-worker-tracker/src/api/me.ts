import { ContractService } from ".";

export type MeResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  type: string;
  role: string;
  startDate: string;
  endDate: string;
  status: string;
};

export const meAPI = () => {
  return ContractService.get<MeResponse>("api/v1/contract-worker/me");
};
