import type { Metadata } from "next";
import "./globals.css";
import { AppQueryClientProvider } from "@/components/provider/app-query-client-provider";
import { ModalProvider } from "@/components/ui/useModal";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/block/theme-provider";
import { cookies } from "next/headers";
import { Theme } from "@/state/theme";

export const metadata: Metadata = {
  title: "Ainc Management",
  description: "Ainc employee management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let defaultTheme = (cookies().get("theme")?.value as Theme) ?? "light";

  return (
    <html lang="en">
      <ThemeProvider defaultTheme={defaultTheme}>
        <AppQueryClientProvider>
          <Toaster position="top-right" />
          <ModalProvider />
          {children}
        </AppQueryClientProvider>
      </ThemeProvider>
    </html>
  );
}
