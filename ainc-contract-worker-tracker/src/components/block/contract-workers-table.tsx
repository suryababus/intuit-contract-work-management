"use Client";

import { useFilterContractWorkers } from "@/api/contract-worker/filter-contract-workers";
import { Loader } from "../ui/full-page-loader";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useRouter } from "next/navigation";

type Props = {
  searchKey: string;
};

export const ContractWorkersTable = ({ searchKey }: Props) => {
  const { isLoading, data } = useFilterContractWorkers(searchKey);
  const { push } = useRouter();

  const onClickWorker = (contractWorkerId: string) => {
    push(`/contract-worker/${contractWorkerId}`);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>First name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Available Bandwidth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading
            ? data?.data.map((contractWorker) => (
                <TableRow
                  key={contractWorker.employeeNumber}
                  onClick={() => onClickWorker(contractWorker.employeeNumber)}
                >
                  <TableCell className="font-medium">
                    {contractWorker.employeeNumber}
                  </TableCell>
                  <TableCell className="font-medium">
                    {contractWorker.firstName}
                  </TableCell>
                  <TableCell>{contractWorker.lastName ?? "-"}</TableCell>
                  <TableCell>{contractWorker.email ?? "-"}</TableCell>
                  <TableCell>{contractWorker.phone ?? "-"}</TableCell>
                  <TableCell>
                    {contractWorker.availableBandwidth + "%"}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      {isLoading ? (
        <div className="flex justify-center my-2">
          <Loader />
        </div>
      ) : null}
    </>
  );
};
