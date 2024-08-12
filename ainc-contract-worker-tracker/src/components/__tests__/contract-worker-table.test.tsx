import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockQueryProvider, { Mock } from "../provider/mock-query-provider";
import { ContractWorkersTable } from "../block/contract-workers-table";
import { getContractWorkers } from "@/components/__tests__/mocks/get-contract-workers";

describe("AddNewContractWorkerForm", () => {
  test("renders form and submits data", async () => {
    const mocks: Mock[] = [getContractWorkers];

    render(
      <MockQueryProvider mocks={mocks}>
        <ContractWorkersTable searchKey="te" />
      </MockQueryProvider>
    );

    //loading
    await screen.findByTestId("loader");

    await screen.findAllByText("John");

    screen.getByRole("columnheader", {
      name: "Id",
    });

    screen.getByRole("columnheader", {
      name: /first name/i,
    });

    screen.getByRole("columnheader", {
      name: /last name/i,
    });
    screen.getByRole("columnheader", {
      name: /email/i,
    });
    screen.getByRole("columnheader", {
      name: /phone/i,
    });
    screen.getByText("John");
    screen.getByText("Doe");
    screen.getByText("john.doe@example.com");
    screen.getByText("123-456-7890");
  });
});
