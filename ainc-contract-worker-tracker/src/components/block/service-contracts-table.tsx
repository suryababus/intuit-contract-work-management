import { Loader } from "../ui/full-page-loader";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useFilterServiceContracts } from "@/api/service-contract/filter-service-contract";
import { useRouter } from "next/navigation";

type Props = {
  searchKey: string;
};

export const ServiceContractTable = ({ searchKey }: Props) => {
  const { isLoading, data } = useFilterServiceContracts(searchKey);
  const { push } = useRouter();

  const onRowClick = (serviceContractId: string) => {
    push(`/service-contract/${serviceContractId}`);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner Email</TableHead>
            <TableHead>Developer Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading
            ? data?.data &&
              data?.data.map((serviceContract) => (
                <TableRow
                  key={serviceContract.id}
                  onClick={() => onRowClick(serviceContract.id)}
                >
                  <TableCell className="font-medium  text-ellipsis whitespace-nowrap">
                    {serviceContract.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {serviceContract.title}
                  </TableCell>
                  <TableCell>{serviceContract.status ?? "-"}</TableCell>
                  <TableCell>{serviceContract.owner?.email ?? "-"}</TableCell>
                  <TableCell>
                    {serviceContract.developerCountRequired ?? "-"}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      {isLoading ? (
        <div className="flex justify-center my-2">
          <Loader />
        </div>
      ) : null}
    </>
  );
};
