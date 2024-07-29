"use client";

import { useAuth } from "@/state/auth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex-1 h-full flex p-4">
      <h1 className="text-3xl font-bold">Dashboard:</h1>
    </div>
  );
}
