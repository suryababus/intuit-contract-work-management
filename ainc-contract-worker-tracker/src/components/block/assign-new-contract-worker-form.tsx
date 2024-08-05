import { z } from "zod";
import { create } from "zustand";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SearchInput } from "./search-input";
import { SearchSelect } from "../ui/search-select";
import { useState } from "react";
import { filterContractWorkers } from "@/api/contract-worker/filter-contract-workers";
import { FormBuilder } from "../ui/form-builder";
import { useAssignEmployeeServiceContract } from "@/api/service-contract/assign-employee-service-contract";
import { useModal } from "../ui/useModal";
import { toast } from "sonner";
import { AxiosError } from "axios";

const assignNewContractWorkerFormSchema = z.object({
  contractWorker: z
    .object({
      label: z.string().min(1, `Contract Worker is required`),
      value: z.string(),
    })
    .describe("Contract Worker"),
  bandWidthPercentage: z
    .preprocess(
      (a) => parseInt(a as string, 10),
      z.number().positive().max(100)
    )
    .describe("Bandwidth Percentage"),
});

type AssignNewContractWorkerFormProps = {
  serviceContractId: string;
};

export const AssignNewContractWorkerForm = ({
  serviceContractId,
}: AssignNewContractWorkerFormProps) => {
  const { mutateAsync, isPending, error } = useAssignEmployeeServiceContract();
  const { closeModal } = useModal();

  const onSubmit = async (
    data: z.infer<typeof assignNewContractWorkerFormSchema>
  ) => {
    try {
      await mutateAsync({
        employeeId: data.contractWorker.value,
        bandWidthPercentage: data.bandWidthPercentage,
        serviceContractId,
      });
      closeModal();
      toast.success("Contract worker assigned successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          "Error assigning contract worker: " + error.response?.data.message
        );
      }
    }
  };

  return (
    <div className="flex flex-row gap-3 items-center">
      <FormBuilder
        zodSchema={assignNewContractWorkerFormSchema}
        onSubmit={onSubmit}
        title="Assign New Contract Worker"
        description="Select new contract worker who you want to add to this project"
        loading={isPending}
        options={{
          contractWorker: async (key) => {
            const data = await filterContractWorkers(key);

            return data.data.map((sc) => ({
              label: sc.email + ` (${sc.availableBandwidth}%)`,
              value: sc.employeeNumber,
            }));
          },
        }}
      />
    </div>
  );
};
