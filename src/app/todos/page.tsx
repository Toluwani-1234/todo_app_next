"use client"
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the client components with no SSR
const TodosPageClient = dynamic(() => import("../../components/TodosPageClient"), {
  ssr: false,
  loading: () => <p className="p-4">Loading todos page...</p>
});

export default function TodosPage() {
  return <TodosPageClient />;
}
