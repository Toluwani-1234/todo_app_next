
"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from '@/components/AuthProvider';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "@/providers/QueryProvider";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Todo Manager Pro",
//   description: "A modern todo application with offline support",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <QueryClientProvider client={new QueryClient}>
          <Navbar />
          <main>{children}</main>
        </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}