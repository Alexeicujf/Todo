import type { Middleware } from "@reduxjs/toolkit";

export const localStorageMiddelware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    localStorage.setItem("todo_data", JSON.stringify(state.todos));
    localStorage.setItem("list_data", JSON.stringify(state.list));

    return result;
  };
