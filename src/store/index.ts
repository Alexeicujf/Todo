import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./slices/TodosSlice";
import listsReducer from "./slices/ListsSlice";
import { localStorageMiddelware } from "./middlewares/localStorage";
import { Logger } from "./middlewares/logger";
import registerReducer from "./slices/UserRegisterSlice";
import loginReducer from "./slices/UserLoginSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,

    login: loginReducer,
    todos: todosReducer,
    list: listsReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(localStorageMiddelware, Logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
