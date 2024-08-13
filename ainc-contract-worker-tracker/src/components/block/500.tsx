import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  onRetry: () => void;
};

export const SomeThingWentWrong = ({ onRetry }: Props) => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-foreground">
          500
        </h1>
        <p className="mt-4 text-muted-foreground">
          Oops, something went wrong.
        </p>
        <div className="mt-6">
          <Button onClick={onRetry}>Go to Homepage</Button>
        </div>
      </div>
    </div>
  );
};
