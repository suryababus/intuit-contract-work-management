"use client";

import { useContractWorkerServiceContracts } from "@/api/contract-worker/get-contract-worker-service-contracts";
import { Loader } from "@/components/ui/full-page-loader";
import { useParams, useRouter } from "next/navigation";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useContractWorker } from "@/api/contract-worker/get-contract-worker";
import { Button } from "@/components/ui/button";
import { useDeleteContractWorker } from "@/api/contract-worker/delete-contract-worker";
import { useModal } from "@/components/ui/useModal";

function ServiceContractTable() {
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

function ContractWorkerCard() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useContractWorker(id);
  const { mutateAsync } = useDeleteContractWorker();
  const { showModal, closeModal } = useModal();

  const contractWorker = data?.data;

  const onDelete = async () => {
    showModal({
      title: "Delete Contract Worker",
      content: "Are you sure you want to delete this contract worker?",
      onConfirm: async () => {
        await mutateAsync(id);
        closeModal();
      },
      onCancel: closeModal,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle className="p-0 flex flex-row justify-center items-center">
            {contractWorker?.firstName} {contractWorker?.lastName}
            {contractWorker?.deleted && (
              <span className="px-3 py-2 text-sm border-2 ml-2 rounded-full bg-destructive text-destructive-foreground">
                Deleted
              </span>
            )}
          </CardTitle>
          {!contractWorker?.deleted && (
            <Button variant={"destructive"} onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 m-0 pt-0">
        {isLoading ? (
          <div className="flex flex-1 items-start justify-center">
            <Loader />
          </div>
        ) : (
          contractWorker && (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Role</div>
                  <div className="font-medium">{contractWorker.role}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">
                    Employment Dates
                  </div>
                  <div className="font-medium">
                    {contractWorker.startDate} - {contractWorker.endDate}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">
                    Employee Number
                  </div>
                  <div className="font-medium">
                    #{contractWorker.employeeNumber}
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-muted-foreground text-sm mb-1">
                    Status
                  </div>
                  <div className="font-medium p-2 bg-primary rounded-xl text-primary-foreground text-xs">
                    {contractWorker.status}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">
                    Contact Information
                  </div>
                  <div className="font-medium flex flex-col items-start">
                    <div className="border-b pb-2">{contractWorker.email}</div>
                    <div className="mt-2">{contractWorker.phone}</div>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">
                    Available Bandwidth
                  </div>
                  <div className="font-medium">
                    {contractWorker.availableBandwidth} %
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}

export default function ContractWorker() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8 flex flex-col gap-4">
      <ContractWorkerCard />
      <ServiceContractTable />
    </div>
  );
}
