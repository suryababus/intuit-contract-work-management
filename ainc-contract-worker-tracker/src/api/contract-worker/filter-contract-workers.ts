import { useQuery } from "@tanstack/react-query";
import { ContractService } from "..";

interface FilterContractWorkersResponse {
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

export const filterContractWorkers = (filter: string) => {
  return ContractService.get<FilterContractWorkersResponse[]>(
    `/api/v1/contract-workers`,
    {
      params: {
        key: filter,
        page: 0,
        perPage: 10,
      },
    }
  );
};

export const useFilterContractWorkers = (key: string) => {
  const { data, error } = useQuery({
    queryKey: ["filterContractWorkers", key],
    queryFn: () => filterContractWorkers(key),
  });
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
