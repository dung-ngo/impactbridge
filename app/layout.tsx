import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "ImpactBridge",
  description:
    "A fullstack donation platform for campaigns and impact tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-app-salmon text-app-midgreen">
        <Navbar />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
