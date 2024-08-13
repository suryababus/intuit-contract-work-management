import { useServiceContract } from "@/api/service-contract/get-service-contract";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { FullPageLoader } from "../ui/full-page-loader";

type ServiceContractDetailsProps = {
  id: string;
};

export function ServiceContractDetails({ id }: ServiceContractDetailsProps) {
  const { data, error, isLoading } = useServiceContract(id);
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
  return (
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
  );
}
