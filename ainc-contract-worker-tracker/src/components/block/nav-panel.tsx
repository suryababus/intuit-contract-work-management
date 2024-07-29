"use client";

import { cva, VariantProps } from "class-variance-authority";
import { File, Home, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const activeNavStyle = "bg-muted text-primary";
const defaultNavStyle = "text-muted-foreground";

const navStyleVariants = cva(
  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
  {
    variants: {
      active: {
        true: activeNavStyle,
        false: defaultNavStyle,
      },
    },
  }
);

export const NavPanel = () => {
  const pathName = usePathname();
  const isCurrentPath = (path: string) => {
    return pathName === path;
  };
  return (
    <div className="pt-5 px-2 bg-muted/40">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Link
          href="/dashboard"
          className={navStyleVariants({ active: isCurrentPath("/dashboard") })}
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/contract-workers"
          className={navStyleVariants({
            active: isCurrentPath("/contract-workers"),
          })}
        >
          <Users className="h-4 w-4" />
          Contract Workers
        </Link>
        <Link
          href="/service-contracts"
          className={navStyleVariants({
            active: isCurrentPath("/service-contracts"),
          })}
        >
          <File className="h-4 w-4" />
          Service Contracts
        </Link>
      </nav>
    </div>
  );
};
