import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginRequest, registerRequest } from "@/api/auth";
import { useAppSelector } from "@/store/hooks/useAppSelector";

export interface authRegister {
  id: number | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  error: string | null;
}

export const reducerUser = createAsyncThunk<
  { id: number; userId?: number; user?: { id: number }; user_id?: number },
  Record<string, string>
>("auth/register", async (userData, thunkAPI) => {
  try {
    const data = await registerRequest(userData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      axios.isAxiosError(error) ? error.response?.data?.error : "Ошибка сервера"
    );
  }
});

export const logintUser = createAsyncThunk<
  { id: number; userId?: number; user?: { id: number }; user_id?: number },
  Record<string, string>
>("auth/login", async (userData, thunkAPI) => {
  try {
    const data = await loginRequest(userData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      axios.isAxiosError(error) ? error.response?.data?.error : "Ошибка сервера"
    );
  }
});

const savedUserId = localStorage.getItem("auth_user_id");

const initialState: authRegister = {
  id: savedUserId ? Number(savedUserId) : null,
  isAuthenticated: savedUserId ? true : false,
  isAuthLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth_user_id");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reducerUser.pending, (state) => {
      state.isAuthenticated = false;
      state.isAuthLoading = true;
      state.error = null;
    });
    builder.addCase(reducerUser.fulfilled, (state, action) => {
      state.isAuthLoading = false;
      state.isAuthenticated = true;

      const userId =
        action.payload.user_id ||
        action.payload.id ||
        action.payload.userId ||
        action.payload.user?.id ||
        1;
      state.id = userId;
      localStorage.setItem("auth_user_id", String(userId));
    });
    builder.addCase(reducerUser.rejected, (state, action) => {
      state.isAuthLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload as string;
    });
    builder.addCase(logintUser.pending, (state) => {
      state.isAuthLoading = true;
      state.isAuthenticated = false;
      state.error = null;
    });
    builder.addCase(logintUser.fulfilled, (state, action) => {
      state.isAuthLoading = false;
      state.isAuthenticated = true;

      const userId =
        action.payload.user_id ||
        action.payload.id ||
        action.payload.userId ||
        action.payload.user?.id ||
        1;
      state.id = userId;
      localStorage.setItem("auth_user_id", String(userId));
    });
    builder.addCase(logintUser.rejected, (state, action) => {
      state.isAuthLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload as string;
    });
  },
});

export const useRegisterState = () => useAppSelector((state) => state.auth);
export default authSlice.reducer;
