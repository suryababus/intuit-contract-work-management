"use client";
import {
  Employee,
  useServiceContract,
} from "@/api/service-contract/get-service-contract";
import { FullPageLoader } from "@/components/ui/full-page-loader";
import { notFound, useParams, useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, Plus } from "lucide-react";
import { AssignNewContractWorkerForm } from "@/components/block/assign-new-contract-worker-form";
import { useModal } from "@/components/ui/useModal";
import { useAuth } from "@/state/auth";
import { toast } from "sonner";
import { EditServiceContractForm } from "@/components/block/edit-service-contract-form";

export default function ServiceContract() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useServiceContract(id);
  const { showModal } = useModal();

  if (isLoading) {
    return <FullPageLoader />;
  }
  if (error) {
    notFound();
  }

  const serviceContract = data?.data;

  let percentageFilled =
    ((serviceContract?.currentDeveloperCount ?? 0) /
      (serviceContract?.developerCountRequired ?? 0)) *
    100;

  percentageFilled = percentageFilled > 100 ? 100 : percentageFilled;

  const showEditModal = () => {
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

  return (
    <div className="w-full flex-1 max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{serviceContract?.title}</h1>
          <p className="text-muted-foreground">
            {serviceContract?.description}
          </p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Developer Count</div>
              <div className="text-sm font-medium">
                <span className="text-primary">
                  {serviceContract?.currentDeveloperCount}
                </span>{" "}
                / {serviceContract?.developerCountRequired}
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{
                  width: percentageFilled + "%",
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Status</div>
              <div className="text-sm font-medium text-primary">
                {serviceContract?.status}
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Start Date</div>
              <div className="text-sm font-medium">2023-04-01</div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Due Date</div>
              <div className="text-sm font-medium">2023-09-30</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="grid gap-2 ">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Developers Required</div>
              <div className="text-sm font-medium">
                {serviceContract?.developerCountRequired ?? 0}
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Current Developers</div>
              <div className="text-sm font-medium">
                {serviceContract?.currentDeveloperCount ?? 0}
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Remaining Slots</div>
              <div className="text-sm font-medium text-primary">
                {(serviceContract?.developerCountRequired ?? 0) -
                  (serviceContract?.currentDeveloperCount ?? 0)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ProjectMembers
        employees={serviceContract?.employees ?? []}
        serviceContractOwnerEmail={serviceContract?.owner.email ?? ""}
        serviceContractStatus={serviceContract?.status ?? ""}
        serviceContractId={id}
      />
    </div>
  );
}

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
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
