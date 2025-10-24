// 

"use client";
import React, { useState } from "react";
import { ChevronRight, Filter, Search } from "lucide-react";

interface SearchFormValues {
  search: string;
  status: "all" | "complete" | "incomplete";
}

interface Props {
  onSearch: (search: string, status: "all" | "complete" | "incomplete") => void;
}

export default function SearchFilterForm({ onSearch }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "complete" | "incomplete">("all");

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(search, status); // Fixed: was calling 'search' function instead of 'onSearch'
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search, status, onSearch]); // Fixed: dependency should be 'onSearch' not 'search'

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6 backdrop-blur-sm bg-opacity-95">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
          {/* Fixed: Changed 'search' to 'Search' component */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your todos..."
            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
          />
        </div>
        <div className="relative sm:w-52 group">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors pointer-events-none z-10" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-gray-50 focus:bg-white cursor-pointer font-medium text-gray-700"
          >
            <option value="all">All Tasks</option>
            <option value="complete">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}