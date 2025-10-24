"use client";

import React, { useState } from "react";
import { useTodos } from "@/lib/queries";
import SearchFilterForm from "@/components/SearchFilterForm";
import TodoList from "@/components/TodoList";
import Pagination from "@/components/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";


export default function TodosPage() {
  const { page, next, prev } = usePagination(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "complete" | "incomplete">("all");

  const { data: todos, isLoading, isError } = useTodos(page, 10, search, status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3">
            My Todo List
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Stay organized and productive with your daily tasks
          </p>
        </div>

        {/* Search and Filter */}
        <SearchFilterForm
          onSearch={(query, filter) => {
            setSearch(query);
            setStatus(filter);
          }}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="relative">
              <Loader2 className="w-14 h-14 text-blue-500 animate-spin" />
              <div className="absolute inset-0 w-14 h-14 border-4 border-blue-200 rounded-full animate-ping"></div>
            </div>
            <p className="text-gray-600 font-semibold mt-6 text-lg">Loading your todos...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-8 flex items-start gap-5 shadow-md">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-red-900 text-xl mb-2">Unable to Load Todos</h3>
              <p className="text-red-700 leading-relaxed">
                We encountered an error while fetching your todos. Please check your connection and try again.
              </p>
            </div>
          </div>
        )}

        {/* Todo List */}
        {!isLoading && !isError && (
          <>
            {todos && todos.length > 0 ? (
              <>
                <div className="mb-4 flex items-center justify-between px-1">
                  <p className="text-sm font-semibold text-gray-600">
                    Showing <span className="text-blue-600">{todos.length}</span> task{todos.length !== 1 ? 's' : ''}
                  </p>
                  {(search || status !== "all") && (
                    <button 
                      onClick={() => {
                        setSearch("");
                        setStatus("all");
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
                <TodoList todos={todos} />
                <Pagination
                  page={page}
                  onPrev={prev}
                  onNext={next}
                  disablePrev={page === 1}
                  disableNext={!todos || todos.length < 10}
                />
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-md border border-gray-100 p-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No Todos Found
                </h3>
                <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
                  {search || status !== "all"
                    ? "Try adjusting your search criteria or filters to find what you're looking for."
                    : "You're all caught up! Create your first todo to get started on your journey to productivity."}
                </p>
                {(search || status !== "all") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setStatus("all");
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}