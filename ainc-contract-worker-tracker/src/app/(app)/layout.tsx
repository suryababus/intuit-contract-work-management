"use client";
import ErrorBoundary from "@/components/block/error-boundary";
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
    return (
      <div className="h-screen w-screen">
        <FullPageLoader />
      </div>
    );
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
        <div className="flex-1">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
