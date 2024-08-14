import { z } from "zod";
import { FormBuilder } from "../ui/form-builder";
import { toast } from "sonner";
import { useModal } from "../ui/useModal";
import { filterContractWorkers } from "@/api/contract-worker/filter-contract-workers";
import { useEditServiceContract } from "@/api/service-contract/update-service-contract";
import {
  handleAxiosError,
  handleAxiosErrorToString,
} from "@/lib/axios-error-handler";
import { AxiosError } from "axios";

const editServiceContractRequestSchema = z.object({
  title: z.string().min(10).max(50).describe("Title"),
  description: z.string().min(10).max(200).describe("Description"),
  status: z
    .enum(["DRAFT", "APPROVED", "ACTIVE", "INACTIVE", "DONE"])
    .describe("Status"),
});

type EditServiceContractFormProps = {
  serviceContractId: string;
  status: string;
  description: string;
  title: string;
};

export const EditServiceContractForm = ({
  serviceContractId,
  description,
  status,
  title,
}: EditServiceContractFormProps) => {
  const { mutateAsync, isPending, error } = useEditServiceContract();
  const { closeModal } = useModal();

  const onSubmit = async (
    data: z.infer<typeof editServiceContractRequestSchema>
  ) => {
    try {
      await mutateAsync({
        id: serviceContractId,
        ...data,
      });
      closeModal();
      toast.success("Service contract updated successfully");
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
        zodSchema={editServiceContractRequestSchema}
        onSubmit={onSubmit}
        title="Update Service Contract"
        description={`Please fill out the form to update service contract(${serviceContractId})`}
        loading={isPending}
        defaultValues={{
          status: status as any,
          description,
          title,
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
