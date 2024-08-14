import { useAddNewServiceContract } from "@/api/service-contract/create-new-service-contract";

import { z } from "zod";
import { FormBuilder } from "../ui/form-builder";
import { toast } from "sonner";
import { useModal } from "../ui/useModal";
import { filterContractWorkers } from "@/api/contract-worker/filter-contract-workers";
import { handleAxiosErrorToString } from "@/lib/axios-error-handler";
import { AxiosError } from "axios";

const statusOptions = [
  {
    label: "DRAFT",
    value: "DRAFT",
  },
  {
    label: "APPROVED",
    value: "APPROVED",
  },
  {
    label: "ACTIVE",
    value: "ACTIVE",
  },
  {
    label: "INACTIVE",
    value: "INACTIVE",
  },
  {
    label: "DONE",
    value: "DONE",
  },
];

const createNewServiceContractRequestSchema = z.object({
  title: z.string().min(10).max(50).describe("Title"),
  description: z.string().min(10).max(200).describe("Description"),
  status: z
    .enum(["DRAFT", "APPROVED", "ACTIVE", "INACTIVE", "DONE"])
    .describe("Status"),
  ownerId: z
    .object({
      value: z.string().regex(/^\d+$/, "Only Number").describe("Owner"),
      label: z.string(),
    })
    .describe("Owner"),
  developerCountRequired: z
    .string()
    .regex(/^\d+$/, "Only Number")
    .min(1, "Developer count is required")
    .describe("Developer Count"),
});

export const AddNewServiceContractForm = () => {
  const { mutateAsync, isPending, error } = useAddNewServiceContract();
  const { closeModal } = useModal();

  const onSubmit = async (
    data: z.infer<typeof createNewServiceContractRequestSchema>
  ) => {
    try {
      await mutateAsync({
        ...data,
        ownerId: data.ownerId.value,
      });
      closeModal();
      toast.success("Service Contract created successfully");
    } catch (e) {
      if (e instanceof AxiosError) {
        let errorMessage = handleAxiosErrorToString(e);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col">
      <FormBuilder
        zodSchema={createNewServiceContractRequestSchema}
        onSubmit={onSubmit}
        title="Add New Service Contract"
        description="Please fill out the form to add a new service contract"
        loading={isPending}
        options={{
          ownerId: async (key) => {
            const data = await filterContractWorkers(key);

            return data.data.map((sc) => ({
              label: sc.email,
              value: sc.employeeNumber,
            }));
          },
        }}
      />
      {error && (
        <p className="text-red-500 text-center">
          {handleAxiosErrorToString(error as AxiosError)}
        </p>
      )}
    </div>
  );
};
