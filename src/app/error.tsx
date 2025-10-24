"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <button
        className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </main>
  );
}
