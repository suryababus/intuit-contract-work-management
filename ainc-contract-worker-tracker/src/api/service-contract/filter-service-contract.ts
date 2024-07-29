import { useQuery } from "@tanstack/react-query";
import { ContractService } from "..";

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

export const filterServiceContracts = (filter: string) => {
  return ContractService.get<FilterServiceContractsResponse[]>(
    `/api/v1/service-contracts`,
    {
      params: {
        key: filter,
      },
    }
  );
};

export const useFilterServiceContracts = (key: string) => {
  return useQuery({
    queryKey: ["filterServiceContracts", key],
    queryFn: () => filterServiceContracts(key),
  });
};
