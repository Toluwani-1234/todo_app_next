import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { Todo } from "../types/todo";
import localforage from "localforage";

const TODOS_KEY = ["todos"];

// Fetch multiple todos with pagination, search, and status filter
export const fetchTodos = async (
  page: number,
  limit = 10,
  q = "",
  status: "all" | "complete" | "incomplete" = "all"
): Promise<Todo[]> => {
  const params: Record<string, number> = { _page: page, _limit: limit };
  // q param not supported by JSONPlaceholder but we can filter client-side later
  const { data } = await api.get<Todo[]>("/todos", { params });

  // Save cache to localforage for offline fallback
  await localforage.setItem(`todos_page_${page}`, data);

  // Filter by status
  return data.filter((todo) => {
    if (status === "all") return true;
    return status === "complete" ? todo.completed : !todo.completed;
  });
};

// Fetch single todo by ID
export const fetchTodo = async (id: number | string): Promise<Todo> => {
  const { data } = await api.get<Todo>(`/todos/${id}`);
  await localforage.setItem(`todo_${id}`, data);
  return data;
};

// Hook to fetch paginated todos
export function useTodos(
  page: number,
  limit = 10,
  q = "",
  status: "all" | "complete" | "incomplete" = "all"
) {
  return useQuery<Todo[], Error>({
    queryKey: [...TODOS_KEY, page, q, status],
    queryFn: async () => {
      try {
        return await fetchTodos(page, limit, q, status);
      } catch (err) {
        const cached = await localforage.getItem<Todo[]>(`todos_page_${page}`);
        if (cached) return cached;
        throw err as Error;
      }
    },
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch a single todo
export function useTodo(id?: number | string) {
  return useQuery<Todo, Error>({
    queryKey: ["todo", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      try {
        return await fetchTodo(id);
      } catch (err) {
        const cached = await localforage.getItem<Todo>(`todo_${id}`);
        if (cached) return cached;
        throw new Error("Could not fetch todo");
      }
    },
    enabled: !!id,
  });
}

// Mutation hooks

export function useCreateTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (newTodo: Partial<Todo>) => 
      api.post<Todo>("/todos", newTodo).then(res => res.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}

export function useUpdateTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Todo> }) =>
      api.put<Todo>(`/todos/${id}`, data).then(res => res.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}

export function useDeleteTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/todos/${id}`).then(res => res.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: TODOS_KEY }),
  });
}