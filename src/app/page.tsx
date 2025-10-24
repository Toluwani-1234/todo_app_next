// "use client";

// import React from "react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";

// export default function HomePage() {
//   const { data: session } = useSession();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
//         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//           <span className="block">Todo App</span>
//           <span className="block text-blue-600">Manage your tasks efficiently</span>
//         </h1>
//         <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//           A simple and intuitive todo application built with Next.js, React Query, and NextAuth.js
//         </p>
//         <div className="mt-10 sm:flex sm:justify-center">
//           {session ? (
//             <div className="rounded-md shadow">
//               <Link
//                 href="/todos"
//                 className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
//               >
//                 View Your Todos
//               </Link>
//             </div>
//           ) : (
//             <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
//               <Link
//                 href="/login"
//                 className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 sm:px-8"
//               >
//                 Sign in
//               </Link>
//               <Link
//                 href="/register"
//                 className="flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 sm:px-8"
//               >
//                 Sign up
//               </Link>
//             </div>
//           )}
//         </div>
        
//         <div className="mt-20">
//           <h2 className="text-2xl font-bold text-gray-900">Features</h2>
//           <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
//             <div className="pt-6">
//               <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
//                 <div className="-mt-6">
//                   <div className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
//                     <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Task Management</h3>
//                   <p className="mt-5 text-base text-gray-500">
//                     Create, update, and delete tasks with ease. Mark tasks as complete when you're done.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="pt-6">
//               <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
//                 <div className="-mt-6">
//                   <div className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
//                     <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                     </svg>
//                   </div>
//                   <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Secure Authentication</h3>
//                   <p className="mt-5 text-base text-gray-500">
//                     Sign in with email/password or Google to keep your todos private and secure.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="pt-6">
//               <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
//                 <div className="-mt-6">
//                   <div className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
//                     <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
//                     </svg>
//                   </div>
//                   <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Offline Support</h3>
//                   <p className="mt-5 text-base text-gray-500">
//                     Access your todos even when offline with local caching and synchronization.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

    
//   );
// }
      

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth"; // Adjust path to your auth config

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  // If user is logged in, show authenticated home page
  if (session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Welcome Back, {session.user?.email?.split('@')[0] || 'User'}! 👋
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Ready to manage your todos?
            </p>
          </div>

          {/* Main CTA Card */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center">
              <div className="mb-6">
                <svg
                  className="w-20 h-20 mx-auto text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Todo Dashboard
              </h2>
              <p className="text-gray-600 mb-8">
                Access your personalized todo list with full CRUD capabilities,
                offline support, and advanced filtering.
              </p>
              <Link
                href="/todos"
                className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                View My Todos →
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-blue-600 mb-3">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Create & Manage
              </h3>
              <p className="text-sm text-gray-600">
                Add, edit, and delete todos with ease
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-green-600 mb-3">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Search & Filter
              </h3>
              <p className="text-sm text-gray-600">
                Find todos quickly with powerful filters
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-purple-600 mb-3">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Offline Support
              </h3>
              <p className="text-sm text-gray-600">
                Works offline with local caching
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If not logged in, show landing page with login prompt
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Todo Manager Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern, feature-rich todo application with offline support,
            advanced filtering, and seamless data synchronization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Login to Get Started
            </Link>
            <Link
              href="/register"
              className="inline-block px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Advanced Filtering
                </h3>
                <p className="text-gray-600">
                  Search and filter your todos by status, keywords, and more
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Offline First
                </h3>
                <p className="text-gray-600">
                  Works seamlessly offline with local caching using IndexedDB
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Error Handling
                </h3>
                <p className="text-gray-600">
                  Robust error boundaries and graceful fallbacks
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-yellow-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Fast & Responsive
                </h3>
                <p className="text-gray-600">
                  Built with Next.js 14 and TanStack Query for optimal performance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}