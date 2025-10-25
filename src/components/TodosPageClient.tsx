"use client";
import React from "react";
import { usePagination } from "@/hooks/usePagination";
import { useTodos } from "@/lib/queries";
import TodoList from "@/components/TodoList";
import Pagination from "@/components/Pagination";
import SearchFilterForm from "@/components/SearchFilterForm";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TodosPageClient() {
  const { data: session } = useSession();
  const { page, next, prev } = usePagination(1);
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"all"|"complete"|"incomplete">("all");

  const { data: todos, isLoading, isError } = useTodos(page, 10, query, status);

  if (!session) {
    return (
      <div className="p-4 max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Requireddd</h1>
        <p className="mb-6">You need to be signed in to view your todos.</p>
        <div className="flex justify-center space-x-4">
          <Link 
            href="/login" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/register" 
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Todos</h1>
        <p className="text-sm text-gray-600">
          Welcome, {session.user?.name || 'User'}
        </p>
      </div>
      <SearchFilterForm onSearch={(q,s) => { setQuery(q); setStatus(s); }} />
      {isLoading && <p className="py-4 text-center">Loading your todos...</p>}
      {isError && <p className="py-4 text-center text-red-500">Something went wrong loading your todos.</p>}
      {todos && todos.length === 0 && (
        <p className="py-8 text-center text-gray-500">No todos found. Create your first todo!</p>
      )}
      {todos && todos.length > 0 && <TodoList todos={todos} />}
      <Pagination page={page} onPrev={prev} onNext={next} disablePrev={page <= 1} disableNext={false}  />
    </div>
  );
}