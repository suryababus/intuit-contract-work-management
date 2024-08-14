"use client";

import { LoginForm } from "@/components/block/login-form";
import { FullPageLoader } from "@/components/ui/full-page-loader";
import { useAuth } from "@/state/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { init, loading, isAuthenticated } = useAuth();
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

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
