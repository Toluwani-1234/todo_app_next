"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";



interface Props {
  page: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}: {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}) {
  return (
    <div className="flex items-center justify-between mt-8">
      <button
        onClick={onPrev}
        disabled={disablePrev}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm ${
          disablePrev
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 hover:shadow-md active:scale-95"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 px-5 py-3 rounded-xl border-2 border-blue-100 shadow-sm">
          Page <span className="text-blue-600 text-lg mx-1">{page}</span>
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={disableNext}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm ${
          disableNext
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-95"
        }`}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}