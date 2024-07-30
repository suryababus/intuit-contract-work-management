import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddNewContractWorkerForm } from "./add-new-contract-worker-form";
import "@testing-library/jest-dom";
import { useAddNewContractWorker } from "@/api/contract-worker/add-new-contract-worker";
import MockQueryProvider, { Mock } from "../provider/mock-query-provider";

jest.mock("@/api/contract-worker/add-new-contract-worker");

describe("AddNewContractWorkerForm", () => {
  test("renders form and submits data", async () => {
    const mocks: Mock[] = [
      {
        url: "/api/v1/contract-workers",
        method: "get",
        response: [],
        status: 200,
      },
    ];

    (useAddNewContractWorker as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValueOnce(undefined),
      isPending: false,
      error: null,
    });

    render(
      <MockQueryProvider mocks={mocks}>
        <AddNewContractWorkerForm />
      </MockQueryProvider>
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/type/i), {
      target: { value: "CONTRACT_WORKER" },
    });
    fireEvent.change(screen.getByLabelText(/role/i), {
      target: { value: "DEVELOPER" },
    });
    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: "2021-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: "2021-06-30" },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: "ACTIVE" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "1234567890" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(useAddNewContractWorker().mutateAsync).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        type: "CONTRACT_WORKER",
        role: "DEVELOPER",
        startDate: "2021-01-01",
        endDate: "2021-06-30",
        status: "ACTIVE",
        email: "john.doe@example.com",
        phone: "1234567890",
      });
    });
  });
});
