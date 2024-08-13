"use client";

import { ContractWorkerServiceContractTable } from "@/components/block/contract-worker-service-contracts-table";
import { ContractWorkerDetail } from "@/components/block/contract-worker-detail";
import { useContractWorker } from "@/api/contract-worker/get-contract-worker";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import { NotFound } from "@/components/block/404";
import { FullPageLoader } from "@/components/ui/full-page-loader";

export default function ContractWorker() {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error } = useContractWorker(id);

  if (error instanceof AxiosError) {
    if (error.response?.status === 404) {
      // TODO: Handle 404
      return <NotFound />;
    }
  }

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8 flex flex-col gap-4">
      <ContractWorkerDetail />
      <ContractWorkerServiceContractTable />
    </div>
  );
}
