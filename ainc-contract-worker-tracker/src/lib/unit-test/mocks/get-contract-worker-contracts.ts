import { Mock } from "@/components/provider/mock-query-provider";

export const getContractWorkerContracts: Mock = {
  url: "/api/v1/contract-worker/1/service-contracts",
  method: "get",
  response: [
    {
      id: "d7f9ea4a-cbea-4abc-adfc-917f517022f3",
      title: "Onboarding a banking partner",
      description: "We are onboarding a new bank in out payment gateway",
      status: "ACTIVE",
      owner: {
        firstName: "Suryababu",
        lastName: "Sakthivel",
        type: "FULL_TIME",
        role: "ADMIN",
        startDate: null,
        endDate: null,
        employeeNumber: "1",
        status: "ACTIVE",
        email: "suryababu@gmail.com",
        phone: "7010526624",
        deleted: false,
        availableBandwidth: 50,
      },
      developerCountRequired: 15,
      currentDeveloperCount: 2,
      allocatedBandwidth: 20,
    },
  ],
  status: 200,
};
