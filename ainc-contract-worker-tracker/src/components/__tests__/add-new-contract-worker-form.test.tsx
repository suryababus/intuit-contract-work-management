import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddNewContractWorkerForm } from "../block/add-new-contract-worker-form";
import "@testing-library/jest-dom";
import { useAddNewContractWorker } from "@/api/contract-worker/add-new-contract-worker";
import MockQueryProvider from "../provider/mock-query-provider";
import { Mock } from "../provider/mock-query-provider"; // Ensure Mock is imported correctly
import { getContractWorkers } from "@/lib/unit-test/mocks/get-contract-workers";
import { selectFieldInput } from "../../lib/unit-test/util/select-field-input";

jest.mock("@/api/contract-worker/add-new-contract-worker");

const mutateAsync = jest.fn().mockResolvedValueOnce(undefined);

(useAddNewContractWorker as jest.Mock).mockReturnValue({
  mutateAsync,
  isPending: false,
  error: null,
});

describe("Add New Contract Worker Form", () => {
  test("renders form and submits data", async () => {
    const mocks: Mock[] = [getContractWorkers];

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
    await selectFieldInput("search-select-status", "ACTIVE");
    await selectFieldInput("search-select-type", "CONTRACT_WORKER");
    await selectFieldInput("search-select-role", "DEVELOPER");

    fireEvent.change(screen.getByLabelText(/start date/i), {
      target: { value: "2021-01-01" },
    });
    fireEvent.change(screen.getByLabelText(/end date/i), {
      target: { value: "2021-06-30" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "7010526624" },
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /submit/i });
    await waitFor(() => expect(submitButton).toBeEnabled());
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        type: "CONTRACT_WORKER",
        role: "DEVELOPER",
        startDate: "2021-01-01",
        endDate: "2021-06-30",
        status: "ACTIVE",
        email: "john.doe@example.com",
        phone: "7010526624",
      });
    });
  });
});
