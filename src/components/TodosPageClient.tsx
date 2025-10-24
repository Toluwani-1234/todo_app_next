"use client";
import React from "react";
import { usePagination } from "@/hooks/usePagination";
import { useTodos } from "@/lib/queries";
import TodoList from "@/components/TodoList";
import Pagination from "@/components/Pagination";
import SearchFilterForm from "@/components/SearchFilterForm";

export default function TodosPageClient() {
  const { page, next, prev } = usePagination(1);
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"all"|"complete"|"incomplete">("all");

  const { data: todos, isLoading, isError } = useTodos(page, 10, query, status);

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Todos</h1>
      <SearchFilterForm onSearch={(q,s) => { setQuery(q); setStatus(s); }} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}
      {todos && <TodoList todos={todos} />}
      <Pagination page={page} onPrev={prev} onNext={next} disablePrev={false} disableNext={false} />
    </main>
  );
}