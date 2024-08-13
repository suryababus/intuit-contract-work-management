import { useQuery } from "@tanstack/react-query";
import { ContractService } from ".";

interface Response {
  id: string;
  createdAt: string;
  activity: string;
  performedBy: PerformedBy;
  affectedRecord: string;
}

interface PerformedBy {
  email: string;
  employeeNumber: number;
}

const getAuditLogForServiceContract = (id: string) => {
  return ContractService.get<Response[]>("api/v1/audit-log/" + id);
};

export const useAuditLogForServiceContract = (id: string) => {
  return useQuery({
    queryKey: ["auditLogForServiceContract", id],
    queryFn: () => getAuditLogForServiceContract(id),
  });
};
