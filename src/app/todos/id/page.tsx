"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useTodo } from "@/lib/queries";
import Link from "next/link";

export default function TodoDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { data: todo, isLoading, isError } = useTodo(id);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError || !todo) return <p className="text-center text-red-500">Todo not found.</p>;

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo Details</h1>
      <div className="bg-white border rounded-md p-4 shadow-sm space-y-2">
        <p><strong>ID:</strong> {todo.id}</p>
        <p><strong>Title:</strong> {todo.title}</p>
        <p><strong>Completed:</strong> {todo.completed ? "Yes" : "No"}</p>
        {todo.userId && <p><strong>User ID:</strong> {todo.userId}</p>}
      </div>
      <div className="mt-4 flex gap-3">
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={() => router.back()}
        >
          Go Back
        </button>
        <Link href="/todos" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          All Todos
        </Link>
      </div>
    </main>
  );
}
