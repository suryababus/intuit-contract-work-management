"use client";

import { AddNewContractWorkerForm } from "@/components/block/add-new-contract-worker-form";
import { ContractWorkersTable } from "@/components/block/contract-workers-table";
import { SearchInput } from "@/components/block/search-input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/ui/useModal";
import { Plus } from "lucide-react";
import React from "react";

export default function ContractWorkers() {
  const [searchKey, setSearchKey] = React.useState("");
  const { showModal } = useModal();

  const showAddNewContractWorkerForm = () => {
    showModal({
      content: <AddNewContractWorkerForm />,
    });
  };

  return (
    <div className="flex-1 h-full flex p-4 flex-col">
      <div className="flex flex-row justify-between">
        <SearchInput onKeyChange={setSearchKey} />
        <Button size={"lg"} onClick={showAddNewContractWorkerForm}>
          <Plus className="size-5 mr-2" />
          Add New Contract Worker
        </Button>
      </div>
      <span className="mt-4 border border-input rounded-md">
        <ContractWorkersTable searchKey={searchKey} />
      </span>
    </div>
  );
}
