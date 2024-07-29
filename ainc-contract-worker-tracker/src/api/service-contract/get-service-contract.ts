import { useQuery } from "@tanstack/react-query";
import { ContractService } from "..";

interface Response {
  id: string;
  title: string;
  description: string;
  status: string;
  owner: Employee;
  developerCountRequired: number;
  currentDeveloperCount: number;
  employees: Employee[];
}

export interface Employee {
  firstName: string;
  lastName: null | string;
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

export const getServiceContract = (id: string) => {
  return ContractService.get<Response>(`/api/v1/service-contract/${id}`);
};

export const useServiceContract = (id: string) => {
  return useQuery({
    queryKey: ["serviceContract", id],
    queryFn: () => getServiceContract(id),
  });
};
