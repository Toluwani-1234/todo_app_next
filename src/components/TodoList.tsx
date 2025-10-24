"use client";
import React from "react";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
}

export default function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden backdrop-blur-sm bg-opacity-95">
      <div className="divide-y divide-gray-100">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
