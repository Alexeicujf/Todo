import axios from "axios";

// чтобы везде адрес локалхоста руками
export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// ЗАМЕНИТЬ НА ID
