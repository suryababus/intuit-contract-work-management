import z from "zod";
import { FormBuilder } from "../ui/form-builder";
import { useAddNewContractWorker } from "@/api/contract-worker/add-new-contract-worker";
import { toast } from "sonner";
import { useModal } from "../ui/useModal";
import { AxiosError } from "axios";
import { handleAxiosErrorToString } from "@/lib/axios-error-handler";

const addNewContractWorkerFormSchema = z.object({
  firstName: z.string().min(2).max(50).describe("First Name"),
  lastName: z.string().min(2).max(50).describe("Last Name"),
  type: z.enum(["CONTRACT_WORKER", "FULL_TIME"]).describe("Type"),
  role: z.enum(["PM", "DEVELOPER", "ADMIN"]).describe("Role"),
  startDate: z.string().date().describe("Start Date"),
  endDate: z.string().date().describe("End Date"),
  status: z.enum(["ACTIVE", "INACTIVE", "TERMINATED"]).describe("Status"),
  email: z.string().email().describe("Email"),
  phone: z
    .string()
    .regex(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)
    .describe("Phone"),
});

export const AddNewContractWorkerForm = () => {
  const { mutateAsync, isPending, error } = useAddNewContractWorker();
  const { closeModal } = useModal();

  const addNewContractWorker = async (
    data: z.infer<typeof addNewContractWorkerFormSchema>
  ) => {
    try {
      await mutateAsync(data);
      closeModal();
      toast.success("Contract worker added successfully");
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
        zodSchema={addNewContractWorkerFormSchema}
        onSubmit={addNewContractWorker}
        title="Add New Contract Worker"
        description="Please fill out the form to add a new contract worker"
        loading={isPending}
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};
