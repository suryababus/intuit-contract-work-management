import { Mock } from "@/components/provider/mock-query-provider";

export const getContractWorkers: Mock = {
  url: "/api/v1/contract-workers",
  method: "get",
  response: [
    {
      employeeNumber: "1",
      firstName: "John",
      lastName: "Doe",
      type: "CONTRACT_WORKER",
      role: "DEVELOPER",
      startDate: "2021-01-01",
      endDate: "2021-06-30",
      status: "ACTIVE",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      deleted: false,
    },
  ],
  status: 200,
};
