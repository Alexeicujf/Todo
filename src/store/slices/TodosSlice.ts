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

// Конфигурация типов для thunkAPI, чтобы избежать any
interface ThunkApiConfig {
  state: RootState;
  rejectValue: string;
}

// Извлекаем userId напрямую из типизированного RootState
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
    // 💡 ИСПРАВЛЕНО: Делаем запрос напрямую через apiInstance, жестко прописывая путь
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
      // Получение всех задач
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

      // Создание
      .addCase(createTodoAsynс.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.isCreateModalOpen = false;
      })

      // Чекбокс
      .addCase(checkTodoAsyns.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.todos.findIndex((item) => item.id === updated.id);
        if (index !== -1) {
          state.todos[index].check = updated.check;
        }
      })

      // Удаление
      .addCase(removeTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((item) => item.id !== action.payload);
      })

      // Обновление (Редактирование) текста и описания
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        state.isCreateModalOpen = false;
        const updated = action.payload;
        const index = state.todos.findIndex((item) => item.id === updated.id);
        if (index !== -1) {
          // Обновляем только те поля, которые вернул бэкенд, сохраняя структуру
          state.todos[index] = { ...state.todos[index], ...updated };
        }
      });
  },
});

export const { setModalOpen } = TodosSlice.actions;
export default TodosSlice.reducer;
