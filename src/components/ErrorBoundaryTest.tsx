"use client";

import React from "react";

export default function ErrorBoundaryTest() {
  const throwError = () => {
    throw new Error("Test error boundary!");
  };

  return (
    <button
      onClick={throwError}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Trigger Error
    </button>
  );
}
