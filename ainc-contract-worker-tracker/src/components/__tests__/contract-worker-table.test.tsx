import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddNewContractWorkerForm } from "../block/add-new-contract-worker-form";
import "@testing-library/jest-dom";
import { useAddNewContractWorker } from "@/api/contract-worker/add-new-contract-worker";
import MockQueryProvider, { Mock } from "../provider/mock-query-provider";
import { url } from "inspector";
import { ContractWorkersTable } from "../block/contract-workers-table";

describe("AddNewContractWorkerForm", () => {
  test("renders form and submits data", async () => {
    const mocks: Mock[] = [
      {
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
      },
    ];

    render(
      <MockQueryProvider mocks={mocks}>
        <ContractWorkersTable searchKey="te" />
      </MockQueryProvider>
    );

    //loading
    await screen.findByTestId("loader");

    await screen.findAllByText("John");

    screen.getByRole("columnheader", {
      name: /id/i,
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
