import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRegister } from "./UserRegisterSlice";
import axios from "axios";
import { useAppSelector } from "../hooks/useAppSelector";

export interface LoginResponse {
  userId: number;
  success: boolean;
  user: string;
}

export interface LoginState {
  isLoading: boolean;
  error: string;
  userId: number | null;
  login: string | null;
}

export const initialState: LoginState = {
  isLoading: false,
  error: "",
  userId: null,
  login: null,
};

export const LoginUser = createAsyncThunk<
  LoginResponse,
  UserRegister,
  { rejectValue: string }
>("user/login", async (userData, thunkAPI) => {
  let message = "Что-то пошло не так";
  try {
    const response = await axios.post(`http://localhost:3000/login`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || error.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const userLogin = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(
        LoginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isLoading = false;
          state.login = action.payload.user;
          state.userId = action.payload.userId;
        }
      )
      .addCase(
        LoginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || "Неизвестная ошибка";
        }
      );
  },
});
export const useLoginState = () => useAppSelector((state) => state.login);
export default userLogin.reducer;
