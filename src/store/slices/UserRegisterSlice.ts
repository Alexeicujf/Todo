import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/useAppSelector";
import axios from "axios";
export interface UserRegister {
  password: string;
  login: string;
}
export interface RegisterResponse {
  success: boolean;
  message: string;
}
const initialState = {
  user: [],
  isLoading: false,
  error: "",
};

export const registerUser = createAsyncThunk<
  RegisterResponse,
  UserRegister,
  { rejectValue: string }
>("user/register", async (userData, thunkAPI) => {
  let message = "что-то пошло не так";
  try {
    const response = await axios.post(
      `http://localhost:3000/register`,
      userData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.error || error.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || "Неизвестная ошибка";
        }
      );
  },
});
export const useRegisterState = () => useAppSelector((state) => state.register);

export default userReducer.reducer;
