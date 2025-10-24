"use client";
import React from "react";
import Link from "next/link";
import { Todo } from "@/types/todo";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { CheckCircle2, Circle } from "lucide-react";

interface Props {
  todo: Todo;
}

export default function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="group relative p-5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200 border-l-4 border-transparent hover:border-blue-500">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          {todo.completed ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 drop-shadow-sm" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300 group-hover:text-blue-400 transition-colors" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-base leading-relaxed ${
            todo.completed
              ? "text-gray-400 line-through"
              : "text-gray-800 font-medium group-hover:text-gray-900"
          }`}>
            {todo.title}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
              todo.completed
                ? "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200"
                : "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200"
            }`}>
              {todo.completed ? "✓ Completed" : "⏳ In Progress"}
            </span>
            <span className="text-xs text-gray-400 font-mono">#{todo.id}</span>
          </div>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
          View →
        </button>
      </div>
    </div>
  );
}