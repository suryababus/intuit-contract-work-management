import { useFilterServiceContracts } from "@/api/service-contract/filter-service-contract";
import { useActionState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/full-page-loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ServiceContractThatNeedsWorkforce = () => {
  const { isLoading, data } = useFilterServiceContracts("");

  const serviceContractsThatNeedWorkForce =
    data?.data.filter(
      (serviceContract) =>
        serviceContract.developerCountRequired -
          serviceContract.currentDeveloperCount >
        0
    ) ?? [];

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Service Contracts That Need Work Force</CardTitle>
        <CardDescription>
          View of top service contracts that need work force
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="text-xs">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Developer Count Needed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {serviceContractsThatNeedWorkForce.map((serviceContract) => (
              <TableRow key={serviceContract.id}>
                <TableCell className="font-medium">
                  {serviceContract.title}
                </TableCell>
                <TableCell>{serviceContract.owner.email}</TableCell>
                <TableCell>
                  {serviceContract.developerCountRequired -
                    serviceContract.currentDeveloperCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && (
          <div className="w-full flex items-center justify-center py-2">
            <Loader />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
