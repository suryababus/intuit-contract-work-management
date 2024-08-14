"use client";
import {
  Employee,
  useServiceContract,
} from "@/api/service-contract/get-service-contract";
import { FullPageLoader } from "@/components/ui/full-page-loader";
import { notFound, useParams, useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { AssignNewContractWorkerForm } from "@/components/block/assign-new-contract-worker-form";
import { useModal } from "@/components/ui/useModal";
import { useAuth } from "@/state/auth";
import { toast } from "sonner";
import { ServiceContractDetails } from "@/components/block/service-contract-details";
import { ServiceContractHeader } from "@/components/block/service-contract-header";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AuditLog } from "@/components/block/audit-log";
import { MoveContractWorkerForm } from "@/components/block/move-contract-worker-form";
import { Button } from "@/components/ui/button";

const defaultTabStyle = "px-3 py-2 rounded-md bg-muted/25 m-2 cursor-pointer";
const activeTabStyle = "bg-primary text-primary-foreground";

export default function ServiceContract() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useServiceContract(id);
  const [tab, setTab] = useState(0);

  if (isLoading) {
    return <FullPageLoader />;
  }
  if (error) {
    notFound();
  }

  const serviceContract = data?.data;

  return (
    <div className="w-full flex-1 max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <ServiceContractHeader id={id} />
      <div className="flex flex-row  items-center border-b-2 mb-4">
        <span
          className={cn(defaultTabStyle, tab === 0 && activeTabStyle)}
          onClick={() => setTab(0)}
        >
          Details
        </span>
        <span
          className={cn(defaultTabStyle, tab === 1 && activeTabStyle)}
          onClick={() => setTab(1)}
        >
          Audit Logs
        </span>
      </div>
      {tab === 0 ? (
        <>
          <ServiceContractDetails id={id} />
          <ProjectMembers
            employees={serviceContract?.employees ?? []}
            serviceContractOwnerEmail={serviceContract?.owner.email ?? ""}
            serviceContractStatus={serviceContract?.status ?? ""}
            serviceContractId={id}
          />
        </>
      ) : (
        <AuditLog id={id} />
      )}
    </div>
  );
}

type ProjectMembersProps = {
  employees: Employee[];
  serviceContractId: string;
  serviceContractOwnerEmail: string;
  serviceContractStatus: string;
};

function ProjectMembers({
  employees,
  serviceContractId,
  serviceContractOwnerEmail,
  serviceContractStatus,
}: ProjectMembersProps) {
  const { user } = useAuth();
  const { showModal } = useModal();

  const { push } = useRouter();

  const showAddNewContractWorkerForm = () => {
    if (user?.email !== serviceContractOwnerEmail) {
      toast.error("Only the owner can add new contract workers");
      return;
    }

    if (serviceContractStatus !== "ACTIVE") {
      toast.error("Contract must be active to add new contract workers");
      return;
    }

    showModal({
      content: (
        <AssignNewContractWorkerForm serviceContractId={serviceContractId} />
      ),
    });
  };

  const onEmployeeCardClick = (id: string) => {
    push("/contract-worker/" + id);
  };

  const onMoveEmployeeClick = (id: string) => {
    showModal({
      content: (
        <MoveContractWorkerForm
          employeeNumber={id}
          sourceContractId={serviceContractId}
        />
      ),
    });
  };
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Project Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {employees.map((employee) => (
          <Card key={employee.employeeNumber}>
            <CardContent
              className="flex flex-col items-center gap-2"
              onClick={() => onEmployeeCardClick(employee.employeeNumber)}
            >
              <Avatar className="w-16 h-16 border">
                <AvatarFallback>
                  {employee.firstName[0].toUpperCase() +
                    (employee.lastName?.[0]?.toUpperCase() ?? "")}
                </AvatarFallback>
              </Avatar>
              <div className="text-lg font-medium">{employee.firstName}</div>
              <div className="text-sm text-muted-foreground">
                {employee.role}
              </div>
              <div className="text-sm text-muted-foreground">
                {employee.email}
              </div>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveEmployeeClick(employee.employeeNumber);
                }}
              >
                Move Contract Worker
              </Button>
            </CardContent>
          </Card>
        ))}
        <Card
          className="hover:bg-muted/40"
          onClick={showAddNewContractWorkerForm}
        >
          <CardContent className="flex flex-col items-center gap-2 ">
            <Avatar className="w-16 h-16 border">
              <AvatarFallback>
                <Plus className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div className="text-muted-foreground font-medium text-center mt-4">
              Add Employee To Project
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
