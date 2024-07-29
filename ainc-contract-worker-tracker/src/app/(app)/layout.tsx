"use client";
import { NavPanel } from "@/components/block/nav-panel";
import { TopBar } from "@/components/block/top-bar";
import { FullPageLoader } from "@/components/ui/full-page-loader";
import { useAuth } from "@/state/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, loading, init } = useAuth();

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return <FullPageLoader />;
  }

  if (!isAuthenticated) {
    // redirect to login
    redirect(`/login`);
  }

  return (
    <div className="flex-1 flex flex-col">
      <TopBar />
      <div className="flex-1 flex">
        <NavPanel />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
