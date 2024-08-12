import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockQueryProvider, { Mock } from "../provider/mock-query-provider";
import { ContractWorkerDetail } from "../block/contract-worker-detail";
import { useParams } from "next/navigation";

const getContractWorker: Mock = {
  url: "/api/v1/contract-worker/1",
  method: "get",
  response: {
    employeeNumber: "1",
    firstName: "John",
    lastName: "Doe",
    role: "DEVELOPER",
    startDate: "2021-01-01",
    endDate: "2021-06-30",
    status: "ACTIVE",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    availableBandwidth: 80,
    deleted: false,
  },
  status: 200,
};

const deleteContractWorker: Mock = {
  url: "/api/v1/contract-worker/1",
  method: "delete",
  response: {},
  status: 204,
};
// mock next useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useParams: jest.fn(() => ({ id: "1" })),
}));

describe("ContractWorkerDetail Component", () => {
  test("renders contract worker details and handles delete action", async () => {
    const mocks: Mock[] = [getContractWorker, deleteContractWorker];

    render(
      <MockQueryProvider mocks={mocks}>
        <ContractWorkerDetail />
      </MockQueryProvider>
    );

    // Assert that the loader is shown initially
    screen.getByTestId("loader");

    // Wait for the data to be loaded
    await screen.findByText(/John Doe/i);
    await screen.findByText("john.doe@example.com");
    await screen.findByText("123-456-7890");
    await screen.findByText("80 %");

    // Check if the delete button is present
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();

    // Simulate a delete action
    fireEvent.click(deleteButton);

    // Check if the modal with delete confirmation is shown
    await screen.findByText(
      "Are you sure you want to delete this contract worker?"
    );

    // Confirm delete
    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    // Wait for the modal to close
    await waitFor(() => {
      expect(
        screen.queryByText(
          "Are you sure you want to delete this contract worker?"
        )
      ).not.toBeInTheDocument();
    });
  });
});
