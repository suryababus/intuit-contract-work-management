"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/state/theme";

import { Inter as FontSans } from "next/font/google";
import { useEffect } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme: "light" | "dark";
};

export const ThemeProvider = ({
  children,
  defaultTheme,
}: ThemeProviderProps) => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(defaultTheme);
  }, [defaultTheme, setTheme]);

  return (
    <body
      className={cn(
        "min-h-screen bg-background font-sans antialiased flex flex-row",
        theme,
        fontSans.variable
      )}
    >
      {children}
    </body>
  );
};
