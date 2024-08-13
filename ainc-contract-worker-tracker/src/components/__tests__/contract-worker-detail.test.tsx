import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockQueryProvider, { Mock } from "../provider/mock-query-provider";
import { ContractWorkerDetail } from "../block/contract-worker-detail";
import { getContractWorker } from "@/lib/unit-test/mocks/get-contract-worker";
import { deleteContractWorker } from "@/lib/unit-test/mocks/delete-contract-worker";

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
