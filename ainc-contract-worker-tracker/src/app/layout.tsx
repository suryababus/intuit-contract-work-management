import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppQueryClientProvider } from "@/components/provider/app-query-client-provider";
import { ModalProvider } from "@/components/ui/useModal";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ainc Management",
  description: "Ainc employee management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-row light",
          fontSans.variable
        )}
      >
        <AppQueryClientProvider>
          <Toaster position="top-right" />
          <ModalProvider />
          {children}
        </AppQueryClientProvider>
      </body>
    </html>
  );
}
