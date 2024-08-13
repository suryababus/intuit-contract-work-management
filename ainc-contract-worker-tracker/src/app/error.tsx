"use client"; // Error boundaries must be Client Components

import { SomeThingWentWrong } from "@/components/block/500";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <SomeThingWentWrong onRetry={reset} />;
}
