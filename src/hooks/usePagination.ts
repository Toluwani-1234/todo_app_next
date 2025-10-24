import { useState } from "react";

// export function usePagination(initialPage = 1) {
//   const [page, setPage] = useState(initialPage);
//   const next = () => setPage(p => p + 1);
//   const prev = () => setPage(p => Math.max(1, p - 1));
//   const go = (n: number) => setPage(n);
//   return { page, next, prev, go, setPage };
// }

// const usePagination = (page: number, limit: number, search: string, status: string) => {
//   const mockTodos = [
//     { id: 1, title: "Complete project documentation", completed: false, userId: 1 },
//     { id: 2, title: "Review pull requests", completed: true, userId: 1 },
//     { id: 3, title: "Update dependencies", completed: false, userId: 1 },
//     { id: 4, title: "Fix responsive design issues", completed: true, userId: 1 },
//     { id: 5, title: "Write unit tests", completed: false, userId: 1 },
//     { id: 6, title: "Optimize database queries", completed: true, userId: 1 },
//     { id: 7, title: "Implement dark mode", completed: false, userId: 1 },
//     { id: 8, title: "Set up CI/CD pipeline", completed: true, userId: 1 },
//   ];

//   const filtered = mockTodos.filter(todo => {
//     const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus = 
//       status === "all" ? true :
//       status === "complete" ? todo.completed :
//       !todo.completed;
//     return matchesSearch && matchesStatus;
//   });

//   return {
//     data: filtered,
//     isLoading: false,
//     isError: false,
//   };
// };

export const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);
  const next = () => setPage(p => p + 1);
  const prev = () => setPage(p => Math.max(1, p - 1));
  const go = (n: number) => setPage(n);
  return { page, next, prev, go, setPage };
};
