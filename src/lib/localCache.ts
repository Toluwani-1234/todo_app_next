import localforage from "localforage";

localforage.config({ name: "my-todos-app" });

export const setCache = (key: string, value: any) => localforage.setItem(key, value);
export const getCache = <T>(key: string) => localforage.getItem<T>(key);
export const removeCache = (key: string) => localforage.removeItem(key);
