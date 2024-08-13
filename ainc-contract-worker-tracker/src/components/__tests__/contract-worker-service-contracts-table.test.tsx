import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockQueryProvider, { Mock } from "../provider/mock-query-provider";
import { getContractWorker } from "@/lib/unit-test/mocks/get-contract-worker";
import { deleteContractWorker } from "@/lib/unit-test/mocks/delete-contract-worker";
import { ContractWorkerServiceContractTable } from "../block/contract-worker-service-contracts-table";
import { getContractWorkerContracts } from "@/lib/unit-test/mocks/get-contract-worker-contracts";

// mock next useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useParams: jest.fn(() => ({ id: "1" })),
}));

describe("ContractWorkerDetail Component", () => {
  test("renders contract worker details and handles delete action", async () => {
    const mocks: Mock[] = [
      getContractWorker,
      deleteContractWorker,
      getContractWorkerContracts,
    ];

    render(
      <MockQueryProvider mocks={mocks}>
        <ContractWorkerServiceContractTable />
      </MockQueryProvider>
    );

    // Assert that the loader is shown initially
    screen.getByTestId("loader");

    // Wait for the data to be loaded
    await screen.findByText(/Onboarding a banking partner/i);
    await screen.findByText(
      /we are onboarding a new bank in out payment gateway/i
    );
    await screen.findByRole("cell", {
      name: /active/i,
    });

    await screen.findByRole("cell", {
      name: /suryababu@gmail\.com/i,
    });
    await screen.findByText(/20%/i);
  });
});
