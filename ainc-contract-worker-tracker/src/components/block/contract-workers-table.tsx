import { useFilterContractWorkers } from "@/api/contract-worker/filter-contract-workers";
import { FullPageLoader } from "../ui/full-page-loader";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  searchKey: string;
};

export const ContractWorkersTable = ({ searchKey }: Props) => {
  const { isLoading, data } = useFilterContractWorkers(searchKey);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>First name</TableHead>
          <TableHead>Last name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <FullPageLoader />
        ) : (
          data?.data.map((contractWorker) => (
            <TableRow key={contractWorker.employeeNumber}>
              <TableCell className="font-medium">
                {contractWorker.employeeNumber}
              </TableCell>
              <TableCell className="font-medium">
                {contractWorker.firstName}
              </TableCell>
              <TableCell>{contractWorker.lastName ?? "-"}</TableCell>
              <TableCell>{contractWorker.email ?? "-"}</TableCell>
              <TableCell>{contractWorker.phone ?? "-"}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
