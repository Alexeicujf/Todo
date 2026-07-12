import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getTodos,
  createTodoRequest,
  checkTodoRequest,
  removeTodoRequest,
} from "@/api/todos";
import axios from "axios";
import { RootState } from "@/store";
import { apiInstance } from "@/api/instance";
export interface Todo {
  id: number;
  title: string;
  check: boolean;
  description: string;
  list: number;
}

export interface TodoSliceState {
  todos: Todo[];
  isCreateModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

interface ThunkApiConfig {
  state: RootState;
  rejectValue: string;
}

const getUserIdFromState = (state: RootState): number => {
  const userState =
    (state as unknown as Record<string, Record<string, unknown>>).auth ||
    (state as unknown as Record<string, Record<string, unknown>>).user;
  return Number(userState?.id || localStorage.getItem("auth_user_id") || 0);
};

export const getTodosAsync = createAsyncThunk<Todo[], void, ThunkApiConfig>(
  "todos/fetchAll",
  async (_, thunkAPI) => {
    try {
      const data = await getTodos(getUserIdFromState(thunkAPI.getState()));
      return data.todos || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data?.error
          : "Ошибка сервера"
      );
    }
  }
);

export const createTodoAsynс = createAsyncThunk<
  Todo,
  { title: string; description?: string; list: number },
  ThunkApiConfig
>("todo/create", async (todoData, thunkAPI) => {
  try {
    const data = await createTodoRequest({
      ...todoData,
      userId: getUserIdFromState(thunkAPI.getState()),
    });
    return data.todo || data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      axios.isAxiosError(error) ? error.response?.data?.error : "Ошибка сервера"
    );
  }
});

export const checkTodoAsyns = createAsyncThunk<
  Todo,
  { id: number; check: boolean },
  ThunkApiConfig
>("todo/check", async ({ id, check }, thunkAPI) => {
  try {
    const data = await checkTodoRequest(id, check);
    return data.todo || data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      axios.isAxiosError(error) ? error.response?.data?.error : "Ошибка сервера"
    );
  }
});

export const removeTodoAsync = createAsyncThunk<number, number, ThunkApiConfig>(
  "todo/remove",
  async (id, thunkAPI) => {
    try {
      await removeTodoRequest(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        axios.isAxiosError(error)
          ? error.response?.data?.error
          : "Ошибка сервера"
      );
    }
  }
);

export const updateTodoAsync = createAsyncThunk<
  Todo,
  { todoId: number; title: string; description?: string },
  ThunkApiConfig
>("todo/update", async ({ todoId, title, description }, thunkAPI) => {
  try {
    const response = await apiInstance.patch(`/todos/${todoId}`, {
      title,
      description,
    });
    const data = response.data;

    return data.todo || data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      axios.isAxiosError(error) ? error.response?.data?.error : "Ошибка сервера"
    );
  }
});

const initialState: TodoSliceState = {
  todos: [],
  isCreateModalOpen: false,
  isLoading: false,
  error: null,
};

export const TodosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Неизвестная ошибка";
      })

      .addCase(createTodoAsynс.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.isCreateModalOpen = false;
      })

      .addCase(checkTodoAsyns.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.todos.findIndex((item) => item.id === updated.id);
        if (index !== -1) {
          state.todos[index].check = updated.check;
        }
      })

      .addCase(removeTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((item) => item.id !== action.payload);
      })

      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        state.isCreateModalOpen = false;
        const updated = action.payload;
        const index = state.todos.findIndex((item) => item.id === updated.id);
        if (index !== -1) {
          state.todos[index] = { ...state.todos[index], ...updated };
        }
      });
  },
});

export const { setModalOpen } = TodosSlice.actions;
export default TodosSlice.reducer;
