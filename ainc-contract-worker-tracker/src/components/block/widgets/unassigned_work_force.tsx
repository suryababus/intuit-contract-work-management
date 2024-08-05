import { useFilterContractWorkers } from "@/api/contract-worker/filter-contract-workers";
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
import { useRouter } from "next/navigation";

export const UnassignedWorkForceWidget = () => {
  const { isLoading, data } = useFilterContractWorkers("");
  const { push } = useRouter();

  const onClickWorker = (contractWorkerId: string) => {
    push(`/contract-worker/${contractWorkerId}`);
  };

  const unassigned =
    data?.data.filter(
      (contractWorker) => contractWorker.availableBandwidth !== 0
    ) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ainc Unassigned Work Force</CardTitle>
        <CardDescription>View of top unassigned employees</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="text-xs">
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Available Bandwidth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {unassigned.map((contractWorker) => (
              <TableRow
                key={contractWorker.employeeNumber}
                onClick={() => onClickWorker(contractWorker.employeeNumber)}
              >
                <TableCell className="font-medium">
                  {contractWorker.firstName}
                </TableCell>
                <TableCell>{contractWorker.type}</TableCell>
                <TableCell>{contractWorker.role}</TableCell>
                <TableCell>{contractWorker.availableBandwidth}%</TableCell>
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
