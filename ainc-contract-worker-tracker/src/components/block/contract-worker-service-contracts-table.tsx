"use client";
import { useContractWorkerServiceContracts } from "@/api/contract-worker/get-contract-worker-service-contracts";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Loader } from "../ui/full-page-loader";

export function ContractWorkerServiceContractTable() {
  const { id } = useParams<{ id: string }>();
  const { push } = useRouter();

  const { isLoading, data } = useContractWorkerServiceContracts(id);

  const serviceContracts = data?.data ?? [];

  const onServiceContractClick = (id: string) => {
    push("/service-contract/" + id);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contract Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Allocated Bandwidth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceContracts.map((serviceContract) => (
              <TableRow
                key={serviceContract.id}
                onClick={() => onServiceContractClick(serviceContract.id)}
              >
                <TableCell>
                  <div className="font-medium">{serviceContract.title}</div>
                </TableCell>
                <TableCell>
                  <div className="text-muted-foreground">
                    {serviceContract.description}
                  </div>
                </TableCell>
                <TableCell>
                  <span>{serviceContract.status}</span>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {serviceContract.owner.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{serviceContract.allocatedBandwidth}%</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading ? (
          <div className="flex flex-1 items-start justify-center">
            <Loader />
          </div>
        ) : serviceContracts.length === 0 ? (
          <div className="flex flex-1 items-start justify-center">
            <div className="text-muted-foreground py-5">
              No service contracts
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
