import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "@/store/slices/TodosSlice";
import listsReducer from "@/store/slices/ListsSlice";
import { localStorageMiddelware } from "@/store/middlewares/localStorage";
import { Logger } from "@/store/middlewares/logger";
import { authSlice } from "@/store/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    todos: todosReducer,
    list: listsReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(localStorageMiddelware, Logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
