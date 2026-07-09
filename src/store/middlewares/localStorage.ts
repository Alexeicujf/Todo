import type { Middleware } from "@reduxjs/toolkit";

export const localStorageMiddelware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    if (
      action &&
      typeof action === "object" &&
      "type" in action &&
      typeof action.type === "string" &&
      action.type.startsWith("todo/")
    ) {
      const currentToken = state.auth.token;
      if (currentToken) {
        const dynamicKey = `todo_data_${currentToken}`;
        localStorage.setItem(dynamicKey, JSON.stringify(state.todos));
      }
    }
    if (
      action &&
      typeof action === "object" &&
      "type" in action &&
      typeof action.type === "string" &&
      action.type.startsWith("list/")
    ) {
      const currentToken = state.auth.token;
      if (currentToken) {
        const dynamicKey = `list_data_${currentToken}`;
        localStorage.setItem(dynamicKey, JSON.stringify(state.list));
      }
    }

    return result;
  };
