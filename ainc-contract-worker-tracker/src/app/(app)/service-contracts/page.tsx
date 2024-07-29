"use client";
import { AddNewServiceContractForm } from "@/components/block/add-new-service-contract-form";
import { SearchInput } from "@/components/block/search-input";
import { ServiceContractTable } from "@/components/block/service-contracts-table";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/ui/useModal";
import { Plus } from "lucide-react";
import React from "react";

export default function ContractWorkers() {
  const [searchKey, setSearchKey] = React.useState("");
  const { showModal } = useModal();

  const showAddNewContractWorkerForm = () => {
    showModal({
      content: <AddNewServiceContractForm />,
    });
  };

  return (
    <div className="flex-1 h-full flex p-4 flex-col">
      <div className="flex flex-row justify-between">
        <SearchInput onKeyChange={setSearchKey} />
        <Button size={"lg"} onClick={showAddNewContractWorkerForm}>
          <Plus className="size-5 mr-2" />
          Add New Service Contract
        </Button>
      </div>
      <span className="mt-4 border border-input rounded-md">
        <ServiceContractTable searchKey={searchKey} />
      </span>
    </div>
  );
}
