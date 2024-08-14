"use client";

import { ServiceContractThatNeedsWorkforce } from "@/components/block/widgets/service-contract-that-needs-workforce";
import { UnassignedWorkForceWidget } from "@/components/block/widgets/unassigned_work_force";

export default function Dashboard() {
  return (
    <div className="flex-1 h-full flex p-4">
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-bold">Dashboard:</h1>
        <div className="flex flex-row gap-4 mt-4">
          <UnassignedWorkForceWidget />
          <ServiceContractThatNeedsWorkforce />
        </div>
      </div>
    </div>
  );
}
