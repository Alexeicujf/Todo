import { apiInstance } from "./instance";

export interface AuthResponse {
  id: number;
  userId?: number;
  user_id?: number;
  user?: {
    id: number;
  };
}

export const loginRequest = async (
  userData: Record<string, string>
): Promise<AuthResponse> => {
  const response = await apiInstance.post<AuthResponse>("/login", userData);
  return response.data;
};

export const registerRequest = async (
  userData: Record<string, string>
): Promise<AuthResponse> => {
  const response = await apiInstance.post<AuthResponse>("/register", userData);
  return response.data;
};
