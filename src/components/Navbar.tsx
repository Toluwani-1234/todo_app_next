// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";
// import { useState } from "react";

// export default function Navbar() {
//   const { data: session } = useSession();
//   const pathname = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex">
//             <div className="flex-shrink-0 flex items-center">
//               <Link href="/" className="text-xl font-bold text-blue-600">
//                 Todo App
//               </Link>
//             </div>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               <Link
//                 href="/"
//                 className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
//                   pathname === "/"
//                     ? "border-blue-500 text-gray-900"
//                     : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
//                 }`}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/todos"
//                 className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
//                   pathname === "/todos" || pathname.startsWith("/todos/")
//                     ? "border-blue-500 text-gray-900"
//                     : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
//                 }`}
//               >
//                 Todos
//               </Link>
//             </div>
//           </div>
//           <div className="hidden sm:ml-6 sm:flex sm:items-center">
//             {session ? (
//               <div className="ml-3 relative">
//                 <div>
//                   <button
//                     onClick={toggleMenu}
//                     className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     id="user-menu"
//                     aria-expanded="false"
//                     aria-haspopup="true"
//                   >
//                     <span className="sr-only">Open user menu</span>
//                     {session.user?.image ? (
//                       <img
//                         className="h-8 w-8 rounded-full"
//                         src={session.user.image}
//                         alt={session.user.name || "User"}
//                       />
//                     ) : (
//                       <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
//                         {session.user?.name?.charAt(0) || "U"}
//                       </div>
//                     )}
//                   </button>
//                 </div>
//                 {isMenuOpen && (
//                   <div
//                     className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
//                     role="menu"
//                     aria-orientation="vertical"
//                     aria-labelledby="user-menu"
//                   >
//                     <div className="px-4 py-2 text-sm text-gray-700 border-b">
//                       <p className="font-medium">{session.user?.name}</p>
//                       <p className="text-gray-500 truncate">{session.user?.email}</p>
//                     </div>
//                     <button
//                       onClick={() => signOut({ callbackUrl: "/" })}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       role="menuitem"
//                     >
//                       Sign out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex space-x-4">
//                 <Link
//                   href="/login"
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
//                 >
//                   Sign in
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//                 >
//                   Sign up
//                 </Link>
//               </div>
//             )}
//           </div>
//           <div className="-mr-2 flex items-center sm:hidden">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//               aria-expanded="false"
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//               <svg
//                 className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
//         <div className="pt-2 pb-3 space-y-1">
//           <Link
//             href="/"
//             className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
//               pathname === "/"
//                 ? "border-blue-500 text-blue-700 bg-blue-50"
//                 : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
//             }`}
//           >
//             Home
//           </Link>
//           <Link
//             href="/todos"
//             className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
//               pathname === "/todos" || pathname.startsWith("/todos/")
//                 ? "border-blue-500 text-blue-700 bg-blue-50"
//                 : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
//             }`}
//           >
//             Todos
//           </Link>
//         </div>
//         {session ? (
//           <div className="pt-4 pb-3 border-t border-gray-200">
//             <div className="flex items-center px-4">
//               {session.user?.image ? (
//                 <div className="flex-shrink-0">
//                   <img
//                     className="h-10 w-10 rounded-full"
//                     src={session.user.image}
//                     alt={session.user.name || "User"}
//                   />
//                 </div>
//               ) : (
//                 <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
//                   {session.user?.name?.charAt(0) || "U"}
//                 </div>
//               )}
//               <div className="ml-3">
//                 <div className="text-base font-medium text-gray-800">{session.user?.name}</div>
//                 <div className="text-sm font-medium text-gray-500">{session.user?.email}</div>
//               </div>
//             </div>
//             <div className="mt-3 space-y-1">
//               <button
//                 onClick={() => signOut({ callbackUrl: "/" })}
//                 className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
//               >
//                 Sign out
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="pt-4 pb-3 border-t border-gray-200">
//             <div className="space-y-1">
//               <Link
//                 href="/login"
//                 className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
//               >
//                 Sign in
//               </Link>
//               <Link
//                 href="/register"
//                 className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
//               >
//                 Sign up
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }



"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-blue-600"
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
            <span className="text-xl font-bold text-gray-900">Todo Manager</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="text-gray-600">Loading...</span>
              </div>
            ) : session ? (
              <>
                {/* Authenticated Menu */}
                <Link
                  href="/todos"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    pathname === "/todos"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  My Todos
                </Link>
                
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-300">
                  <span className="text-sm text-gray-600">
                    {session.user?.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Unauthenticated Menu */}
                <Link
                  href="/login"
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    pathname === "/login"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}