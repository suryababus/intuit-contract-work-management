import { ContractWorkerServiceContractTable } from "@/components/block/contract-worker-service-contracts-table";
import { ContractWorkerDetail } from "@/components/block/contract-worker-detail";

export default function ContractWorker() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8 flex flex-col gap-4">
      <ContractWorkerDetail />
      <ContractWorkerServiceContractTable />
    </div>
  );
}
