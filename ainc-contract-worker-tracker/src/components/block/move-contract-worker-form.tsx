import z from "zod";
import { FormBuilder } from "../ui/form-builder";
import { useAddNewContractWorker } from "@/api/contract-worker/add-new-contract-worker";
import { toast } from "sonner";
import { useModal } from "../ui/useModal";
import { AxiosError } from "axios";
import { handleAxiosErrorToString } from "@/lib/axios-error-handler";
import { useMoveContractWorker } from "@/api/service-contract/move-contract-worker";
import { filterServiceContracts } from "@/api/service-contract/filter-service-contract";

const moveContractWorkerForm = z.object({
  destinationServiceContractId: z
    .object({
      label: z.string().min(1, ` Service Contract is required`),
      value: z.string(),
    })
    .describe("Destination Service Contract"),
});

type MoveContractWorkerFormProps = {
  sourceContractId: string;
  employeeNumber: string;
};

export const MoveContractWorkerForm = ({
  employeeNumber,
  sourceContractId,
}: MoveContractWorkerFormProps) => {
  const { closeModal } = useModal();
  const { mutateAsync, isPending, error } = useMoveContractWorker();

  const moveContractWorkerSubmit = async (
    data: z.infer<typeof moveContractWorkerForm>
  ) => {
    try {
      await mutateAsync({
        destinationContractId: data.destinationServiceContractId.value,
        employeeNumber,
        sourceContractId,
      });

      closeModal();
      toast.success("Contract worker moved successfully");
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
        zodSchema={moveContractWorkerForm}
        onSubmit={moveContractWorkerSubmit}
        title="Move Contract Worker"
        loading={isPending}
        options={{
          destinationServiceContractId: async (key) => {
            const data = await filterServiceContracts(key);
            return data.data.map((sc) => ({
              label: sc.title,
              value: sc.id,
            }));
          },
        }}
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};
