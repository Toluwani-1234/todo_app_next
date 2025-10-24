import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-6">Oops! Page not found.</p>
      <Link href="/todos" className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Go to Todos
      </Link>
    </main>
  );
}
