import { render, screen, fireEvent } from "@testing-library/react";
import { AddNewContractWorkerForm } from "../block/add-new-contract-worker-form";
import "@testing-library/jest-dom";

describe("AddNewContractWorkerForm", () => {
  test("renders form and submits data", async () => {
    render(<AddNewContractWorkerForm />);

    // Check if form elements are present
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    // Add assertions for success message or API call
  });
});
