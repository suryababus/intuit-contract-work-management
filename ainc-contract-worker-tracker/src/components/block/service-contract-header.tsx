import { useServiceContract } from "@/api/service-contract/get-service-contract";
import { useAuth } from "@/state/auth";
import { Pencil, UserIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { FullPageLoader } from "../ui/full-page-loader";
import { useModal } from "../ui/useModal";
import { EditServiceContractForm } from "./edit-service-contract-form";

type ServiceContractHeaderProps = {
  id: string;
};
export function ServiceContractHeader({ id }: ServiceContractHeaderProps) {
  const { data, error, isLoading } = useServiceContract(id);

  const serviceContract = data?.data;
  const { showModal } = useModal();
  const { user } = useAuth();
  const showEditModal = () => {
    if (user?.email !== serviceContract?.owner.email) {
      toast.error("Only the owner can edit this contract");
      return;
    }

    showModal({
      content: (
        <EditServiceContractForm
          serviceContractId={id}
          description={serviceContract?.description ?? ""}
          title={serviceContract?.title ?? ""}
          status={serviceContract?.status ?? ""}
        />
      ),
    });
  };

  if (isLoading) {
    return <FullPageLoader />;
  }
  if (error) {
    notFound();
  }

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">{serviceContract?.title}</h1>
        <p className="text-muted-foreground">{serviceContract?.description}</p>
      </div>
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        <div
          className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm font-medium flex justify-center items-center gap-1"
          onClick={showEditModal}
        >
          <Pencil className="size-3" />
          Edit
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UserIcon className="w-4 h-4" />
          Owner: {serviceContract?.owner?.email}
        </div>
      </div>
    </header>
  );
}
