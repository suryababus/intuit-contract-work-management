"use client";
import { useDeleteContractWorker } from "@/api/contract-worker/delete-contract-worker";
import { useContractWorker } from "@/api/contract-worker/get-contract-worker";
import { handleAxiosErrorToString } from "@/lib/axios-error-handler";
import { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useModal } from "../ui/useModal";
import { Loader } from "../ui/full-page-loader";

export function ContractWorkerDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useContractWorker(id);
  const { mutateAsync } = useDeleteContractWorker();
  const { showModal, closeModal } = useModal();

  const contractWorker = data?.data;

  const onDelete = async () => {
    showModal({
      title: "Delete Contract Worker",
      content: "Are you sure you want to delete this contract worker?",
      onConfirm: async () => {
        try {
          await mutateAsync(id);
        } catch (e) {
          if (e instanceof AxiosError) {
            let errorMessage = handleAxiosErrorToString(e);
            toast.error(errorMessage);
          }
        }
        closeModal();
      },
      onCancel: closeModal,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <CardTitle className="p-0 flex flex-row justify-center items-center">
            {contractWorker?.firstName} {contractWorker?.lastName}
            {contractWorker?.deleted && (
              <span className="px-3 py-2 text-sm border-2 ml-2 rounded-full bg-destructive text-destructive-foreground">
                Deleted
              </span>
            )}
          </CardTitle>
          {!contractWorker?.deleted && (
            <Button variant={"destructive"} onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 m-0 pt-0">
        {isLoading ? (
          <div className="flex flex-1 items-start justify-center">
            <Loader />
          </div>
        ) : (
          contractWorker && (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Role</div>
                  <div className="font-medium">{contractWorker.role}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">
                    Employment Dates
                  </div>
                  <div className="font-medium">
                    {contractWorker.startDate} - {contractWorker.endDate}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">
                    Employee Number
                  </div>
                  <div className="font-medium">
                    #{contractWorker.employeeNumber}
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-muted-foreground text-sm mb-1">
                    Status
                  </div>
                  <div className="font-medium p-2 bg-primary rounded-xl text-primary-foreground text-xs">
                    {contractWorker.status}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-muted-foreground text-sm mb-1">
                    Contact Information
                  </div>
                  <div className="font-medium flex flex-col items-start">
                    <div className="border-b pb-2">{contractWorker.email}</div>
                    <div className="mt-2">{contractWorker.phone}</div>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">
                    Available Bandwidth
                  </div>
                  <div className="font-medium">
                    {contractWorker.availableBandwidth} %
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}
