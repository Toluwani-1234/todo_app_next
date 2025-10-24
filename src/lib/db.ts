import Dexie from "dexie";
import { Todo } from "../types/todo";

export const db = new Dexie("TodosDB");
db.version(1).stores({
  todos: "id, title, completed, userId"
});

export const saveTodosToDexie = async (todos: Todo[]) => db.table("todos").bulkPut(todos);
export const getTodosFromDexie = async () => db.table<Todo>("todos").toArray();
